export const getHighscore = async () => {
	try {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
		const response = await fetch(`${backendUrl}/api/leaderboard/highscore`);
		if (response.ok) {
			const data = await response.json();
			return data.highscore;
		} else {
			return null;
		}
	} catch (err) {
		console.log(err)
		return null;
	}
}