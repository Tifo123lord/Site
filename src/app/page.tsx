import { Suspense } from 'react';
import { Dashboard } from '@/components/matches';
export default function Home(){return <Suspense fallback={<div className="loading-state">Loading matches…</div>}><Dashboard/></Suspense>;}
