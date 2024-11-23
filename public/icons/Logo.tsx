export const Logo = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="5 50 280 195"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            role="img"
            aria-label={'ITPM HUB'}
        >
            <defs>
                <linearGradient
                    id="gradient-fill"
                    x1="0"
                    y1="0.5"
                    x2="1"
                    y2="0.5"
                    spreadMethod="pad"
                >
                    <stop offset="0%" stopColor="#004dff" />
                    <stop offset="65%" stopColor="#00fff8" />
                </linearGradient>
            </defs>
            <polygon
                points="0,-24.252805 21.003545,-12.126403 21.003545,12.126402 0,24.252805 -21.003545,12.126402 -21.003545,-12.126403 0,-24.252805"
                transform="matrix(-1.110324 3.426143-5.759044-1.866357 145.167741 147.5)"
                fill="#bad0fc"
                stroke="#bed4ff"
            />
            <text
                fontFamily="Roboto, sans-serif"
                fontSize="15"
                fontWeight="700"
                fontStyle="italic"
                transform="matrix(2.486958 0 0 3.128214 52.526274 159.291813)"
                fill="url(#gradient-fill)"
            >
                {'ITPM HUB'}
            </text>
        </svg>
    );
};
