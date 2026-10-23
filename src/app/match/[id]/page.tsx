import { MatchDetails } from '@/components/details';
export default async function MatchPage({params}:{params:Promise<{id:string}>}){const {id}=await params;return <MatchDetails id={id}/>;}
