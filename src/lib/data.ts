export type Team = { name: string; short: string; color: string; mark: string };
export type Match = { id: string; league: string; home: Team; away: Team; status: 'upcoming' | 'live' | 'finished'; time: string; minute?: number; score: [number, number]; odds: [number, number, number]; possession: [number, number]; shots: [number, number] };
export type Market = 'winner' | 'goals' | 'btts';
export type Selection = { matchId: string; market: Market; outcome: string; odds: number; label: string; matchName: string };
export type Prediction = { id: string; selections: Selection[]; stake: number; odds: number; return: number; status: 'pending' | 'won' | 'lost'; created: string };
export type DemoState = { version: 1; balance: number; matches: Match[]; selections: Selection[]; predictions: Prediction[]; language: 'en' | 'fa' };
const team = (name: string, short: string, color: string, mark: string): Team => ({ name, short, color, mark });
const arsenal = team('Arsenal', 'ARS', '#c93640', 'A');
const chelsea = team('Chelsea', 'CHE', '#2866bf', 'C');
const city = team('Manchester City', 'MCI', '#77bde0', 'M');
const liverpool = team('Liverpool', 'LIV', '#df414b', 'L');
const madrid = team('Real Madrid', 'RMA', '#e7d69a', 'RM');
const barca = team('Barcelona', 'BAR', '#a74b83', 'B');
export const leagues = ['All leagues', 'Premier League', 'La Liga', 'Champions League', 'Serie A', 'Bundesliga', 'Ligue 1'];
export const mockMatches: Match[] = [
  { id:'ars-che', league:'Premier League', home:arsenal, away:chelsea, status:'live', time:'18:30', minute:67, score:[2,1], odds:[1.65,3.8,5.2], possession:[58,42], shots:[12,7] },
  { id:'rma-bar', league:'La Liga', home:madrid, away:barca, status:'upcoming', time:'21:00', score:[0,0], odds:[2.15,3.6,3.1], possession:[50,50], shots:[0,0] },
  { id:'mci-liv', league:'Premier League', home:city, away:liverpool, status:'upcoming', time:'20:45', score:[0,0], odds:[1.92,3.75,3.8], possession:[50,50], shots:[0,0] },
  { id:'bay-dor', league:'Bundesliga', home:team('Bayern Munich','BAY','#e24851','B'), away:team('Borussia Dortmund','BVB','#f0ce43','09'), status:'live', time:'19:30', minute:34, score:[1,0], odds:[1.48,4.5,6.0], possession:[64,36], shots:[8,3] },
  { id:'int-mil', league:'Serie A', home:team('Inter Milan','INT','#4f82dc','IM'), away:team('AC Milan','MIL','#d94950','M'), status:'upcoming', time:'22:00', score:[0,0], odds:[2.05,3.25,3.65], possession:[50,50], shots:[0,0] },
  { id:'psg-mon', league:'Ligue 1', home:team('Paris Saint-Germain','PSG','#3b6aab','P'), away:team('Monaco','MON','#de5c5b','M'), status:'upcoming', time:'21:45', score:[0,0], odds:[1.55,4.2,5.6], possession:[50,50], shots:[0,0] },
  { id:'rma-bay', league:'Champions League', home:madrid, away:team('Bayern Munich','BAY','#e24851','B'), status:'upcoming', time:'Tomorrow · 21:00', score:[0,0], odds:[2.1,3.7,3.3], possession:[50,50], shots:[0,0] },
];
export const initialState = (): DemoState => ({version:1,balance:1000,matches:structuredClone(mockMatches),selections:[],predictions:[],language:'en'});
export const marketNames: Record<Market,string> = { winner:'Match winner', goals:'Total goals · 2.5', btts:'Both teams to score' };
export function outcomes(match: Match, market: Market) {
  if (market === 'winner') return [{ key:'home', label:match.home.name, short:'1', odds:match.odds[0] },{ key:'draw', label:'Draw', short:'X', odds:match.odds[1] },{ key:'away', label:match.away.name, short:'2', odds:match.odds[2] }];
  if (market === 'goals') return [{key:'over',label:'Over 2.5',short:'Over 2.5',odds:1.85},{key:'under',label:'Under 2.5',short:'Under 2.5',odds:1.95}];
  return [{key:'yes',label:'Yes',short:'Yes',odds:1.72},{key:'no',label:'No',short:'No',odds:2.1}];
}
