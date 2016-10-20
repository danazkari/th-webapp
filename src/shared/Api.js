import uxhr from 'uxhr';
import Q from 'q';
import Config from '../shared/Config';

const Api = {
    getLeaderboard: function() {
        let deferred = Q.defer();
        
        uxhr(Config.leaderboardUrl, {}, {
            complete: function(response) {
                // TODO: Handle errors with uxhr
                deferred.resolve(JSON.parse(response));
            }
        });

        return deferred.promise;
    }
}

export default Api;
