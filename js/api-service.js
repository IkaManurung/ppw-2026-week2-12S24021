const ApiService = {
    async fetchJSON(url) {
        const response = await fetch(url, {
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Gagal mengambil data: ${response.status}`);
        }

        return await response.json();
    },

    async getProjects() {
        return await this.fetchJSON("data/projects.json");
    },

    async getProfile() {
        return await this.fetchJSON("data/profile.json");
    },

    async getServices() {
        return await this.fetchJSON("data/services.json");
    },

    async submitServiceOrder(payload) {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
            }
        );

        if (!response.ok) {
            throw new Error("Gagal mengirim data layanan.");
        }

        return await response.json();
    }
};