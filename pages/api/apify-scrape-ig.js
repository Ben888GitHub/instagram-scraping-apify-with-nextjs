import { ApifyClient } from 'apify-client';

// Prepare actor input
const input = {
	directUrls: ['https://www.instagram.com/psychodad4real/'],
	resultsType: 'details',
	resultsLimit: 100,
	searchType: 'hashtag',
	searchLimit: 1,
	proxy: {
		useApifyProxy: true,
		apifyProxyGroups: ['RESIDENTIAL']
	},
	extendOutputFunction: async ({
		data,
		item,
		helpers,
		page,
		customData,
		label
	}) => {
		return item;
	},
	extendScraperFunction: async ({
		page,
		request,
		label,
		response,
		helpers,
		requestQueue,
		logins,
		addProfile,
		addPost,
		addLocation,
		addHashtag,
		doRequest,
		customData,
		Apify
	}) => {},
	customData: {}
};

// Initialize the ApifyClient with API token
const client = new ApifyClient({
	token: process.env.NEXT_APIFY_API_TOKEN
});

const handler = async (req, res) => {
	// Run the actor and wait for it to finish
	const run = await client.actor('apify/instagram-scraper').call(input);

	// Fetch and print actor results from the run's dataset (if any)
	// console.log('Results from dataset');
	const { items } = await client.dataset(run.defaultDatasetId).listItems();

	res.status(200).json({ igProfile: items });
};

export default handler;
