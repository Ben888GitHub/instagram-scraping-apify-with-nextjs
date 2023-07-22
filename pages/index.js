import axios from 'axios';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	const [username, setUsername] = useState('');
	const [loading, setLoading] = useState(false);
	const [userProfile, setUserProfile] = useState([]);

	const handleSetUsername = (e) => {
		setUsername(e.target.value);
	};

	const showInstagramUser = async () => {
		console.log(username);
		setUserProfile([]);
		setLoading(true);
		try {
			const { data } = await axios.get(
				`/api/apify-scrape-igprofile/${username}`
			);

			setLoading(false);

			setUserProfile(data.user_profile);
			console.log(data.user_profile);
		} catch (err) {
			setLoading(false);
			console.log('Unknown IG User');
		}
	};

	return (
		<main
			className={`flex  flex-col items-center justify-between p-16 ${inter.className}`}
		>
			<p className="text-2xl md:text-4xl lg:text-4xl m-10">
				Apify Instagram Scraper with NextJS
			</p>
			<div className="flex">
				<input
					type="text"
					value={username}
					onChange={handleSetUsername}
					placeholder="Search IG Profile"
					className="p-3 border-2 border-gray-300 rounded-md"
				/>
				<button
					disabled={username === '' || loading === true}
					onClick={showInstagramUser}
					className="p-2 bg-green-700 text-white rounded-md"
				>
					Search
				</button>
			</div>
			{loading && <p className="text-2xl">Loading Profile...</p>}
			{userProfile?.map(
				(
					{
						biography,
						businessCategoryName,
						fullName,
						followersCount,
						followsCount,
						profilePicUrlHD,
						username,
						url,
						postsCount
					},
					idx
				) => (
					<div key={idx} className="mt-10">
						<Image
							width={300}
							height={300}
							className=" max-w-full rounded-lg"
							alt={username}
							src={profilePicUrlHD}
							quality={50}
						/>
						<div className="flex text-center mt-2">
							<div className="m-2">
								<p className="text-xl font-medium">{postsCount}</p>
								<p>Total Posts</p>
							</div>
							<div className="m-2">
								<p className="text-xl font-medium">{followersCount}</p>
								<p>Followers</p>
							</div>
							<div className="m-2">
								<p className="text-xl font-medium">{followsCount}</p>
								<p>Following</p>
							</div>
						</div>
						<div className="ml-2">
							<p className="text-xl md:text-2xl lg:text-2xl mt-3">{fullName}</p>
							<p className="text-lg md:text-xl lg:text-xl text-gray-400 ">
								@{username}
							</p>
							{businessCategoryName && (
								<p className="text-md md:text-lg lg:text-lg">
									{businessCategoryName}
								</p>
							)}
							<a
								className="underline text-sm "
								href={url}
								target="_blank"
								rel="noopener noreferrer"
							>
								{url}
							</a>
							{biography && <p className="text-md w-96 mt-2">{biography}</p>}
						</div>
					</div>
				)
			)}
		</main>
	);
}
