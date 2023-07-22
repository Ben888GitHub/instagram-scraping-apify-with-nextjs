import { ApifyClient } from 'apify-client';

const handler = async (req, res) => {
	// console.log(req.query);
	// Initialize the ApifyClient with API token
	const client = new ApifyClient({
		token: process.env.NEXT_APIFY_API_TOKEN
	});

	const ig_username = req.query.username;

	// Prepare actor input
	const input = {
		usernames: [ig_username]
	};

	if (!ig_username) {
		res.status(200).json({ user_profile: [] });
	}
	const run = await client.actor('apify/instagram-profile-scraper').call(input);
	const { items } = await client.dataset(run.defaultDatasetId).listItems();

	res.status(200).json({ user_profile: items });
	//   res.status(200).json({ name: "John Doe" });
};

export default handler;
