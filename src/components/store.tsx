'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { DemoState, initialState, Match, Selection } from '@/lib/data';
import { isDemoState, settle, submitPrediction } from '@/lib/predictions';
const KEY='velora-demo-v1';
type Store = { state:DemoState; ready:boolean; notice:string; setNotice:(s:string)=>void; toggle:(s:Selection)=>void; remove:(id:string)=>void; clear:()=>void; submit:(stake:number)=>boolean; updateMatch:(m:Match)=>void; addMatch:(m:Match)=>void; language:()=>void; reset:()=>void };
const Context=createContext<Store|null>(null);
export function DemoProvider({children}:{children:ReactNode}) {
 const [state,setState]=useState<DemoState>(initialState); const [ready,setReady]=useState(false); const [notice,setNotice]=useState('');
 useEffect(()=>{try {const raw=localStorage.getItem(KEY); if(raw){const saved:unknown=JSON.parse(raw);if(!isDemoState(saved))throw new Error();setState(saved);}}catch{setNotice('Saved demo data could not be loaded. A fresh demo has been opened.');}setReady(true);},[]);
 useEffect(()=>{if(!ready)return;try{localStorage.setItem(KEY,JSON.stringify(state));}catch{setNotice('Browser storage is unavailable. Changes will not survive a reload.');}},[state,ready]);
 useEffect(()=>{document.documentElement.dir=state.language==='fa'?'rtl':'ltr';document.documentElement.lang=state.language;},[state.language]);
 const toggle=(s:Selection)=>setState(old=>({...old,selections:old.selections.some(x=>x.matchId===s.matchId&&x.market===s.market&&x.outcome===s.outcome)?old.selections.filter(x=>x.matchId!==s.matchId):[...old.selections.filter(x=>x.matchId!==s.matchId),s]}));
 const submit=(stake:number)=>{try{const next=submitPrediction(state,stake);setState(next);setNotice('Prediction placed. Track it in your profile.');return true;}catch(e){setNotice(e instanceof Error?e.message:'Unable to place prediction.');return false;}};
 return <Context.Provider value={{state,ready,notice,setNotice,toggle,remove:(id)=>setState(s=>({...s,selections:s.selections.filter(x=>x.matchId!==id)})),clear:()=>setState(s=>({...s,selections:[]})),submit,updateMatch:(m)=>setState(s=>settle({...s,matches:s.matches.map(x=>x.id===m.id?m:x),selections:s.selections.filter(x=>x.matchId!==m.id)})),addMatch:(m)=>setState(s=>({...s,matches:[...s.matches,m]})),language:()=>setState(s=>({...s,language:s.language==='en'?'fa':'en'})),reset:()=>{setState(initialState());setNotice('Your demo has been reset to 1,000 credits.');}}}>{children}</Context.Provider>;
}
export function useDemo(){const value=useContext(Context);if(!value)throw new Error('DemoProvider is missing');return value;}
export function useText(){const {state}=useDemo();return (en:string,fa:string)=>state.language==='fa'?fa:en;}
