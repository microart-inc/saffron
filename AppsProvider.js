export default class AppsProvider {

    static getApps = async () => {
        if (typeof window === 'undefined') return;
        // Use cache
        if (window.appcache?.apps) {
            // Cache is valid
            return window.appcache;
        } else if (window.appcache?.error) {
            // Previous fetch returned an error, dont refresh
            return {
                apps: null,
                featuredApps: null,
                error: window.appcache.error
            };
        } else {
            // Fetch from server
            let response = await window.fetch('/api/apps');
            if (response.status === 200) {
                // Success
                let apps = [];
                let featuredApps = [];

                let json = await response.json();

                // Reformat data
                Object.keys(json).forEach((key) => {
                    apps.push({
                        id: key,
                        ...json[key]
                    });
                    if (json[key].featured) {
                        featuredApps.push({
                            id: key,
                            ...json[key]
                        });
                    }
                });
                window.appcache = {
                    apps: apps,
                    featuredApps: featuredApps,
                    error: null
                }
                return window.appcache;
            } else {
                // Fail
                window.appcache = {
                    apps: null,
                    featuredApps: null,
                    error: "Could not load apps"
                }
                return window.appcache;
            }
        }
    }
}