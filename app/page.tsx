'use client';

import { useState, SubmitEvent } from 'react';

const DEFAULT_DETAILS = [
    ['IP Address', '192.212.174.101'],
    ['Location', 'Brooklyn, NY 10001'],
    ['Timezone', 'UTC -05:00'],
    ['ISP', 'SpaceX Starlink'],
] as const;

export default function Home() {
    const [query, setQuery] = useState('');
    const [mapQuery, setMapQuery] = useState('Brooklyn, NY 10001');
    const [error, setError] = useState('');

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const searchTerm = query.trim();
        if (!searchTerm) { setError('Enter an IP address or domain to search.'); return; }
        setError('');
        setMapQuery(searchTerm);
    }

    return (
        <main className="relative min-h-screen overflow-hidden font-rubik text-very-dark-gray">
            <section className="relative z-10 flex h-[300px] flex-col items-center bg-[#4c47a3] bg-[url('/images/pattern-bg-mobile.png')] bg-cover bg-center px-6 pt-[26px] sm:h-[280px] sm:bg-[url('/images/pattern-bg-desktop.png')] sm:pt-8">
                <h1 className="m-0 text-[1.6rem] font-medium leading-tight tracking-[-0.02em] text-white sm:text-[2rem]">IP Address Tracker</h1>
                <form 
                    className="mt-6 grid w-full max-w-[555px] grid-cols-[minmax(0,1fr)_58px]" 
                    onSubmit={handleSubmit} 
                    noValidate
                >
                    <label className="sr-only" htmlFor="ip-address">IP address or domain</label>
                    <input 
                        id="ip-address" 
                        type="search" 
                        value={query} 
                        onChange={(event) => setQuery(event.target.value)} 
                        placeholder="Search for any IP address or domain" 
                        aria-describedby="search-error" 
                        aria-invalid={Boolean(error)} 
                        className="h-[58px] min-w-0 rounded-l-[15px] border-0 px-6 text-[18px] outline-none placeholder:text-dark-gray focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-[#4f8cff] aria-invalid:ring-3 aria-invalid:ring-inset aria-invalid:ring-[#e35a5a]" 
                    />
                    <button 
                        className="flex items-center justify-center rounded-r-[15px] bg-black transition-colors hover:bg-[#3f3f3f] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-white" 
                        type="submit" 
                        aria-label="Search for IP address or domain"
                    >
                        <img src="/images/icon-arrow.svg" width="11" height="14" alt="" />
                    </button>
                    <p 
                        id="search-error" 
                        className="col-span-2 m-0 mt-[7px] min-h-4 text-left text-[0.8rem] text-white" 
                        role="alert"
                    >
                        {error}
                    </p>
                </form>
            </section>
            <section 
                className="absolute left-1/2 top-[167px] z-20 w-[calc(100%-48px)] max-w-[1110px] -translate-x-1/2 rounded-[15px] bg-white px-6 py-[25px] sm:top-[200px] sm:grid sm:min-h-[161px] sm:grid-cols-4 sm:px-0 sm:py-[37px]" 
                aria-label="IP address details"
            >
                {DEFAULT_DETAILS.map(([label, value], index) => 
                    <article 
                        className={`text-center sm:px-8 sm:text-left ${index > 0 ? 'mt-[21px] sm:mt-0 sm:border-l sm:border-dark-gray/35' : ''}`} 
                        key={label}
                    >
                        <h2 className="m-0 mb-[7px] text-[0.63rem] font-bold uppercase tracking-[0.12em] text-dark-gray sm:mb-[13px] sm:text-[0.75rem]">
                            {label}
                        </h2>
                        <p className="m-0 break-words text-[1.25rem] font-medium leading-[1.25] tracking-[-0.02em] sm:text-[1.6rem] sm:leading-[1.18]">
                            {value}
                        </p>
                    </article>
                )}
            </section>
            <section 
                className="relative z-0 h-[calc(100vh-300px)] min-h-[528px] sm:h-[calc(100vh-280px)] sm:min-h-[520px]" 
                aria-label="Location map"
            >
                <iframe 
                    className="block h-full w-full border-0" 
                    title="Map showing the tracked IP address location" 
                    src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=12&output=embed`} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade" 
                />
            </section>
        </main>
    );
}
