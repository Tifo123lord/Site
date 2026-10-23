'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <section className="empty-state panel"><h1>Something went offside.</h1><p>We couldn’t load this view. Your saved demo stays in this browser.</p><button className="primary-button" onClick={reset}>Try again</button><a className="back-link" href="/admin">Open demo recovery</a></section>;}
