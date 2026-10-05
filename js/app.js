class PortfolioApp {
    constructor() {
        this.projects = [];
        this.profile = {};
        this.services = [];
        this.currentCategory = "all";

        this.projectContainer = document.getElementById("projectContainer");
        this.projectState = document.getElementById("projectState");
        this.categoryFilter = document.getElementById("categoryFilter");

        this.serviceForm = document.getElementById("serviceForm");
        this.orderCount = document.getElementById("orderCount");
    }

    // =====================================================
    // INITIALIZATION
    // =====================================================

    async init() {
        this.showLoading();

        try {
            // Menggunakan await untuk mengambil data JSON
            this.projects = await ApiService.getProjects();
            this.profile = await ApiService.getProfile();
            this.services = await ApiService.getServices();

            console.log("Projects:", this.projects);
            console.log("Profile:", this.profile);
            console.log("Services:", this.services);

            // Render data ke halaman
            this.renderProfile();
            this.setupCategoryFilter();
            this.renderProjects();
            this.setupModal();
            this.setupForm();
            this.updateOrderCount();

        } catch (error) {
            console.error("Terjadi error saat mengambil data:", error);

            this.showError(
                "Gagal memuat data project. Periksa file JSON dan koneksi Live Server."
            );
        }
    }

    // =====================================================
    // LOADING STATE
    // =====================================================

    showLoading() {
        if (!this.projectState) return;

        this.projectState.innerHTML = `
            <div class="alert alert-info text-center">
                <div class="spinner-border spinner-border-sm me-2" role="status"></div>
                Memuat data project...
            </div>
        `;
    }

    // =====================================================
    // ERROR STATE
    // =====================================================

    showError(message) {
        if (!this.projectState) return;

        this.projectState.innerHTML = `
            <div class="alert alert-danger d-flex align-items-center gap-2" role="alert">
                <i class="bi bi-exclamation-triangle"></i>
                <span>${this.escapeHTML(message)}</span>
            </div>
        `;
    }

    // =====================================================
    // EMPTY STATE
    // =====================================================

    showEmpty() {
        if (!this.projectState) return;

        this.projectState.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-folder-x fs-1 text-secondary"></i>
                <h5 class="mt-3">Belum ada project</h5>
                <p class="text-secondary">
                    Belum ada project pada kategori ini.
                </p>
            </div>
        `;
    }

    // =====================================================
    // PROFILE
    // =====================================================

    renderProfile() {
        if (!this.profile) return;

        const nameElements =
            document.querySelectorAll("[data-profile-name]");

        const descriptionElements =
            document.querySelectorAll("[data-profile-description]");

        const semesterElements =
            document.querySelectorAll("[data-profile-semester]");

        const programElements =
            document.querySelectorAll("[data-profile-program]");

        const emailElements =
            document.querySelectorAll("[data-profile-email]");

        nameElements.forEach(element => {
            element.textContent = this.profile.name || "Ika Maria";
        });

        descriptionElements.forEach(element => {
            element.textContent =
                this.profile.description || "";
        });

        semesterElements.forEach(element => {
            element.textContent =
                this.profile.semester || "";
        });

        programElements.forEach(element => {
            element.textContent =
                this.profile.program || "";
        });

        emailElements.forEach(element => {
            element.textContent =
                this.profile.email || "";
        });
    }

    // =====================================================
    // CATEGORY FILTER
    // =====================================================

    setupCategoryFilter() {
        if (!this.categoryFilter) return;

        const categories = [
            ...new Set(
                this.projects.map(project => project.category)
            )
        ];

        this.categoryFilter.innerHTML = `
            <option value="all">Semua Project</option>
            ${categories
                .map(category => `
                    <option value="${this.escapeAttribute(category)}">
                        ${this.escapeHTML(category)}
                    </option>
                `)
                .join("")}
        `;

        this.categoryFilter.addEventListener("change", event => {
            this.currentCategory = event.target.value;
            this.renderProjects();
        });
    }

    // =====================================================
    // RENDER PROJECTS
    // =====================================================

    renderProjects() {
        if (!this.projectContainer) return;

        let filteredProjects = this.projects;

        if (this.currentCategory !== "all") {
            filteredProjects = this.projects.filter(
                project =>
                    project.category === this.currentCategory
            );
        }

        if (filteredProjects.length === 0) {
            this.projectContainer.innerHTML = "";
            this.showEmpty();
            return;
        }

        if (this.projectState) {
            this.projectState.innerHTML = "";
        }

        this.projectContainer.innerHTML =
            filteredProjects
                .map(project => this.createProjectCard(project))
                .join("");
    }

    // =====================================================
    // PROJECT CARD
    // =====================================================

    createProjectCard(project) {
        const safeId =
            this.escapeAttribute(project.id);

        const safeTitle =
            this.escapeHTML(project.title);

        const safeCategory =
            this.escapeHTML(project.category);

        const safeDescription =
            this.escapeHTML(project.description);

        const safeIcon =
            this.escapeHTML(project.icon || "bi-folder");

        const tags = Array.isArray(project.tags)
            ? project.tags
            : [];

        return `
            <div class="col-md-6 col-lg-4">
                <article class="project-card h-100">

                    <div class="project-banner project-banner-${safeId}">
                        <i class="bi ${safeIcon}" aria-hidden="true"></i>
                    </div>

                    <div class="card-body d-flex flex-column">

                        <span class="badge bg-primary-subtle text-primary mb-3 align-self-start">
                            ${safeCategory}
                        </span>

                        <h3 class="card-title h5">
                            ${safeTitle}
                        </h3>

                        <p class="card-text">
                            ${safeDescription}
                        </p>

                        <div class="mb-3">
                            ${tags
                                .map(tag => `
                                    <span class="badge bg-light text-dark border me-1 mb-1">
                                        ${this.escapeHTML(tag)}
                                    </span>
                                `)
                                .join("")}
                        </div>

                        <button
                            type="button"
                            class="btn btn-outline-primary mt-auto"
                            data-project-id="${safeId}"
                            data-bs-toggle="modal"
                            data-bs-target="#universalProjectModal"
                        >
                            Lihat Detail
                            <i class="bi bi-arrow-right ms-1"></i>
                        </button>

                    </div>
                </article>
            </div>
        `;
    }

    // =====================================================
    // UNIVERSAL MODAL
    // =====================================================

  setupModal() {
    const modalElement =
        document.getElementById("universalProjectModal");

    const modalTitle =
        document.getElementById("projectModalTitle");

    const modalBody =
        document.getElementById("projectModalBody");

    if (!modalElement || !modalTitle || !modalBody) {
        console.error("Elemen modal tidak ditemukan.");
        return;
    }

    // Bootstrap memberi tahu tombol mana yang membuka modal
    modalElement.addEventListener(
        "show.bs.modal",
        (event) => {

            const button = event.relatedTarget;

            if (!button) {
                console.error("Tombol pembuka modal tidak ditemukan.");
                return;
            }

            // Ambil ID project dari tombol
            const projectId =
                button.getAttribute("data-project-id");

            console.log("Project ID yang diklik:", projectId);

            // Cari project dari data JSON
            const project =
                this.projects.find(
                    item => item.id === projectId
                );

            if (!project) {
                console.error(
                    "Project tidak ditemukan:",
                    projectId
                );

                modalTitle.textContent =
                    "Project tidak ditemukan";

                modalBody.textContent =
                    "Data project tidak tersedia.";

                return;
            }

            console.log(
                "Project ditemukan:",
                project
            );

            // ==============================
            // JUDUL MODAL
            // ==============================

            modalTitle.textContent =
                project.title;

            // ==============================
            // ISI MODAL
            // ==============================

            modalBody.innerHTML = `
                <div class="mb-4">

                    <span class="badge bg-primary mb-2">
                        ${this.escapeHTML(project.category)}
                    </span>

                    <span class="text-secondary ms-2">
                        ${this.escapeHTML(project.year || "")}
                    </span>

                </div>

                <h5 class="fw-bold mb-3">
                    Tentang Project
                </h5>

                <p class="text-secondary">
                    ${this.escapeHTML(
                        project.fullDescription ||
                        project.description
                    )}
                </p>

                <h6 class="fw-bold mt-4 mb-3">
                    Teknologi / Tags
                </h6>

                <div>
                    ${(project.tags || [])
                        .map(tag => `
                            <span class="badge bg-light text-dark border me-1 mb-2">
                                ${this.escapeHTML(tag)}
                            </span>
                        `)
                        .join("")}
                </div>
            `;
        }
    );
}

    // =====================================================
    // FORM
    // =====================================================

    setupForm() {
        if (!this.serviceForm) return;

        this.serviceForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();

                const submitButton =
                    this.serviceForm.querySelector(
                        'button[type="submit"]'
                    );

                const originalText =
                    submitButton
                        ? submitButton.innerHTML
                        : "";

                try {
                    if (submitButton) {
                        submitButton.disabled = true;

                        submitButton.innerHTML = `
                            <span
                                class="spinner-border spinner-border-sm me-2"
                                role="status"
                            ></span>
                            Mengirim...
                        `;
                    }

                    const formData =
                        new FormData(
                            this.serviceForm
                        );

                    const payload =
                        Object.fromEntries(
                            formData.entries()
                        );

                    // HTTP POST menggunakan await
                    const response =
                        await ApiService.submitServiceOrder(
                            payload
                        );

                    console.log(
                        "Response REST API:",
                        response
                    );

                    // Simpan order ke localStorage
                    this.saveOrder(payload);

                    // Reset form
                    this.serviceForm.reset();

                    // Tampilkan Toast
                    this.showToast(
                        "Pesanan berhasil dikirim!"
                    );

                } catch (error) {

                    console.error(
                        "Gagal mengirim form:",
                        error
                    );

                    this.showToast(
                        "Gagal mengirim pesanan. Silakan coba lagi.",
                        true
                    );

                } finally {

                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.innerHTML =
                            originalText;
                    }
                }
            }
        );
    }

    // =====================================================
    // LOCAL STORAGE
    // =====================================================

    saveOrder(order) {
        const existingOrders =
            JSON.parse(
                localStorage.getItem(
                    "portfolioServiceOrders"
                ) || "[]"
            );

        existingOrders.push({
            ...order,
            createdAt:
                new Date().toISOString()
        });

        localStorage.setItem(
            "portfolioServiceOrders",
            JSON.stringify(existingOrders)
        );

        this.updateOrderCount();
    }

    updateOrderCount() {
        if (!this.orderCount) return;

        const orders =
            JSON.parse(
                localStorage.getItem(
                    "portfolioServiceOrders"
                ) || "[]"
            );

        this.orderCount.textContent =
            orders.length;
    }

    // =====================================================
    // TOAST
    // =====================================================

    showToast(message, isError = false) {
        const toastElement =
            document.getElementById(
                "serviceToast"
            );

        if (!toastElement) return;

        const toastBody =
            toastElement.querySelector(
                ".toast-body"
            );

        if (toastBody) {
            toastBody.textContent = message;
        }

        if (isError) {
            toastElement.classList.add(
                "text-bg-danger"
            );
            toastElement.classList.remove(
                "text-bg-success"
            );
        } else {
            toastElement.classList.add(
                "text-bg-success"
            );
            toastElement.classList.remove(
                "text-bg-danger"
            );
        }

        const toast =
            bootstrap.Toast.getOrCreateInstance(
                toastElement
            );

        toast.show();
    }

    // =====================================================
    // SECURITY
    // =====================================================

    escapeHTML(value) {
        const div =
            document.createElement("div");

        div.textContent =
            value ?? "";

        return div.innerHTML;
    }

    escapeAttribute(value) {
        return this.escapeHTML(value)
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

// =========================================================
// START APPLICATION
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        const app =
            new PortfolioApp();

        // await digunakan untuk menunggu
        // proses inisialisasi selesai
        await app.init();

        console.log(
            "Portfolio App berhasil dijalankan."
        );
    }
);