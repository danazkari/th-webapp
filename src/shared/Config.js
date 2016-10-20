const Config = {
    resultsPerPage: process.env.RESULTS_PER_PAGE || 5,
    leaderboardUrl: process.env.LEADERBOARD_URL || 'https://apis.trainheroic.com/public/leaderboard/468425',
    pageDuration: 15,
    messageBusName: process.env.MESSAGE_BUS_NAME || 'urn:x-cast:com.th.webapp.cast'
};

export default Config;
