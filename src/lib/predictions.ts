import { DemoState, Match, Prediction, Selection } from './data';
export const round = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;
export const combinedOdds = (selections: Selection[]) => selections.reduce((n,s) => n*s.odds, 1);
export function stakeError(stake: number, balance: number) {
  if (!Number.isFinite(stake) || stake <= 0) return 'Enter a stake greater than zero.';
  if (round(stake) !== stake) return 'Use no more than two decimal places.';
  if (stake > balance) return 'Not enough virtual credits. Lower your stake.';
  return '';
}
export function selectionWon(s: Selection, m: Match) {
  const [h,a] = m.score;
  if (s.market === 'winner') return s.outcome === (h > a ? 'home' : h < a ? 'away' : 'draw');
  if (s.market === 'goals') return s.outcome === (h+a > 2.5 ? 'over' : 'under');
  return s.outcome === (h > 0 && a > 0 ? 'yes' : 'no');
}
export function settle(state: DemoState): DemoState {
  let balance = state.balance;
  const predictions = state.predictions.map((p): Prediction => {
    if (p.status !== 'pending') return p;
    const legs = p.selections.map(s => ({ selection:s, match:state.matches.find(m => m.id === s.matchId) }));
    const lost = legs.some(l => l.match?.status === 'finished' && !selectionWon(l.selection,l.match));
    const complete = legs.every(l => l.match?.status === 'finished');
    if (!lost && !complete) return p;
    if (!lost) balance = round(balance + p.return);
    return {...p,status:lost ? 'lost' : 'won'};
  });
  return {...state,balance,predictions};
}
export function submitPrediction(state: DemoState, stake: number): DemoState {
  const error = stakeError(stake,state.balance);
  if (error) throw new Error(error);
  if (!state.selections.length) throw new Error('Choose at least one outcome.');
  if (state.selections.some(s => state.matches.find(m=>m.id===s.matchId)?.status === 'finished')) throw new Error('A match has finished. Remove it from your slip.');
  const odds = combinedOdds(state.selections);
  const prediction: Prediction = {id:crypto.randomUUID(),selections:[...state.selections],stake,odds,return:round(stake*odds),status:'pending',created:new Date().toISOString()};
  return {...state,balance:round(state.balance-stake),selections:[],predictions:[prediction,...state.predictions]};
}
export function isDemoState(value: unknown): value is DemoState {
  if (!value || typeof value !== 'object') return false;
  const s = value as DemoState;
  const number = (v: unknown) => typeof v === 'number' && Number.isFinite(v) && v >= 0;
  const selection = (v: Selection) => v && typeof v.matchId==='string' && ['winner','goals','btts'].includes(v.market) && typeof v.outcome==='string' && typeof v.label==='string' && typeof v.matchName==='string' && number(v.odds) && v.odds>=1;
  return s.version===1 && number(s.balance) && ['en','fa'].includes(s.language) && Array.isArray(s.matches) && s.matches.length>0 && s.matches.every(m=>m && typeof m.id==='string' && typeof m.league==='string' && m.home && typeof m.home.name==='string' && m.away && typeof m.away.name==='string' && ['upcoming','live','finished'].includes(m.status) && Array.isArray(m.score) && m.score.length===2 && m.score.every(number) && Array.isArray(m.odds) && m.odds.length===3 && m.odds.every(number) && Array.isArray(m.possession) && Array.isArray(m.shots)) && Array.isArray(s.selections) && s.selections.every(selection) && Array.isArray(s.predictions) && s.predictions.every(p=>p && typeof p.id==='string' && Array.isArray(p.selections) && p.selections.every(selection) && number(p.stake) && number(p.odds) && number(p.return) && ['pending','won','lost'].includes(p.status) && typeof p.created==='string');
}
