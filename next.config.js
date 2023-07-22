/** @type {import('next').NextConfig} */
const nextConfig = {
	// reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**'
			}
		],
		domains: [
			'scontent-lax3-1.cdninstagram.com',
			'scontent-sjc3-1.cdninstagram.com',
			'instagram.fphx1-1.fna.fbcdn.net',
			'instagram.fna.fbcdn.net',
			'instagram.net',
			'fna.fbcdn.net'
		]
	},
	output: 'standalone'
};

module.exports = nextConfig;
