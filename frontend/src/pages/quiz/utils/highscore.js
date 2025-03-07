export const getHighscore = async () => {
	try {
		const response = await fetch("/api/leaderboard/highscore");
		if (response.ok) {
			const data = await response.json();
			return data.highscrore;
		} else {
			return null;
		}
	} catch (err) {
		console.log(err)
		return null;
	}
}