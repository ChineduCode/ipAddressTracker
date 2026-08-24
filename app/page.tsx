'use client';

import { useState, useEffect, SubmitEvent } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/Map'), {
    ssr: false,
    loading: () => (
        <div className="flex h-full w-full items-center justify-center bg-gray-100 text-dark-gray">
            Loading map...
        </div>
    ),
});

interface LocationData {
    ip: string;
    isp: string;
    location: {
        city: string;
        region: string;
        postalCode: string;
        timezone: string;
        lat: number;
        lng: number;
    };
}

const API_KEY = process.env.NEXT_PUBLIC_IPIFY_API_KEY;

export default function Home() {
    const [query, setQuery] = useState('');
    const [data, setData] = useState<LocationData | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true)


    const fetchLocation = async (searchTerm = '') => {
        setLoading(true);
        setError('');

        try {
            let url = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`;

            if (searchTerm) {
                // Detecting whether it is a domain or ipaddress
                const isIp = /^(\d{1,3}\.){3}\d{1,3}$/.test(searchTerm);
                url += isIp ? `&ipAddress=${searchTerm}` : `&domain=${searchTerm}`;
            }

            const res = await axios.get(url);
            const result = res.data;

            setData({
                ip: result.ip,
                isp: result.isp,
                location: {
                    city: result.location.city,
                    region: result.location.region,
                    postalCode: result.location.postalCode,
                    timezone: result.location.timezone,
                    lat: result.location.lat,
                    lng: result.location.lng,
                },
            });
        } catch (err) {
        if (axios.isAxiosError(err)) {
            setError(
                err.response?.data?.messages ||
                err.response?.data?.error ||
                'Unable to find that IP or domain. Please try again.'
            );
        } else {
            setError('Something went wrong. Please try again.');
        }
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    // Loading visitor's own IP on 1st rendr
    useEffect(() => {
        fetchLocation();
    }, []);

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const term = query.trim();
        if (!term) {
            setError('Enter an IP address or domain to search.');
            return;
        }
        fetchLocation(term);
    };

    const details = data
        ? [
            ['IP Address', data.ip],
            [
                'Location',
                `${data.location.city}${data.location.region ? `, ${data.location.region}` : ''}${
                    data.location.postalCode ? ` ${data.location.postalCode}` : ''
                }`,
            ],
            ['Timezone', `UTC ${data.location.timezone}`],
            ['ISP', data.isp],
        ]
        : [
            ['IP Address', '—'],
            ['Location', '—'],
            ['Timezone', '—'],
            ['ISP', '—'],
        ];

    return (
        <main className="relative min-h-screen overflow-hidden font-rubik text-very-dark-gray">
            {/* Header */}
            <section className="relative z-10 flex h-[300px] flex-col items-center bg-[#4c47a3] bg-[url('/images/pattern-bg-mobile.png')] bg-cover bg-center px-5 pt-[26px] sm:h-[280px] sm:bg-[url('/images/pattern-bg-desktop.png')] sm:pt-8">
                <h1 className="m-0 text-[1.6rem] font-medium leading-tight tracking-[-0.02em] text-white sm:text-[2rem]">
                    IP Address Tracker
                </h1>

                <form
                    className="mt-6 grid w-full max-w-[600px] sm:max-w-[555px] grid-cols-[minmax(0,1fr)_58px]"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <label className="sr-only" htmlFor="ip-address">
                        IP address or domain
                    </label>
                    <input
                        id="ip-address"
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for any IP address or domain"
                        aria-describedby="search-error"
                        aria-invalid={Boolean(error)}
                        disabled={loading}
                        className="h-[58px] min-w-0 rounded-l-[15px] border-0 bg-white px-5 text-sm sm:px-6 sm:text-[18px] outline-none placeholder:text-dark-gray focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-[#4f8cff] aria-invalid:ring-3 aria-invalid:ring-inset aria-invalid:ring-[#e35a5a] disabled:opacity-70"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        aria-label="Search for IP address or domain"
                        className="flex cursor-pointer items-center justify-center rounded-r-[15px] bg-black transition-colors hover:bg-[#3f3f3f] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        ) : (
                            <img src="/images/icon-arrow.svg" width="11" height="14" alt="" />
                        )}
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

            {/* Info Cards */}
            <section
                className="absolute left-1/2 top-[167px] z-20 w-[calc(100%-45px)] md:max-w-[1110px] -translate-x-1/2 rounded-[15px] bg-white px-6 py-[25px] shadow-lg md:top-[200px] md:grid md:min-h-[161px] md:grid-cols-4 md:px-0 md:py-[37px]"
                aria-label="IP address details"
            >
                {details.map(([label, value], index) => (
                    <article
                        key={label}
                        className={`text-center md:px-8 md:text-left ${
                            index > 0 ? 'mt-[21px] md:mt-0 md:border-l md:border-dark-gray/35' : ''
                        }`}
                    >
                        <h2 className="m-0 mb-[7px] text-[0.63rem] font-bold uppercase tracking-[0.12em] text-dark-gray md:mb-[13px] md:text-[0.75rem]">
                            {label}
                        </h2>
                        <p className="m-0 break-words text-[1.25rem] font-medium leading-[1.25] tracking-[-0.02em] md:text-[1.6rem] md:leading-[1.18]">
                            {loading ? '...' : value}
                        </p>
                    </article>
                ))}
            </section>

            {/* Map */}
            <section
                className="relative z-0 h-[calc(100vh-300px)] min-h-[528px] sm:h-[calc(100vh-280px)] sm:min-h-[520px]"
                aria-label="Location map"
            >
                {data?.location.lat && data?.location.lng ? (
                    <Map lat={data.location.lat} lng={data.location.lng} />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100 text-dark-gray">
                        {loading ? 'Loading map...' : 'No location data available'}
                    </div>
                )}
            </section>
        </main>
    );
}
