(async () => {
    const STATIC_DATA_URL = "db/data.json";
    const DATA_STORAGE_KEY = "resumeData";
    const LEGACY_SKILLS_KEY = "resumeSkills";
    const LEGACY_PROFILE_KEY = "resumeProfile";
    const SESSION_KEY = "resumeAdmin";
    const ADMIN_EMAIL = "kungyc@gmail.com"; // Admin's email
    const FIRESTORE_COLLECTION = "resume";
    const FIRESTORE_DOC_ID = "content";

    const DEFAULT_SKILLS = [
        {
            id: "skill-devops",
            title: "DevOps Automation",
            description:
                "Experience with Docker, Kubernetes and GitLab CI/CD. Skilled at wiring Jenkins, Ansible and ArgoCD to build automated pipelines from commit to production deployment.",
            imageUrl: "assets/photos/devops.jpg"
        },
        {
            id: "skill-network",
            title: "Enterprise Networking",
            description:
                "Plan and maintain WAF, firewalls, switches, Wi-Fi, web servers and VPN. Implement load balancing, HA and rsync replication to keep services consistent across sites.",
            imageUrl: "assets/photos/network.jpg"
        },
        {
            id: "skill-firewall",
            title: "Security & Firewalls",
            description:
                "Hands-on with Palo Alto, SonicWALL and Fortigate platforms. Build layered protection, policy governance and incident monitoring to reduce risk.",
            imageUrl: "assets/photos/firewall.jpg"
        },
        {
            id: "skill-switch",
            title: "Switching Infrastructure",
            description:
                "Deploy and manage Cisco and HPE Aruba switches. Design VLAN, ACL and high-availability topologies for data centers and branch offices.",
            imageUrl: "assets/photos/switching.jpg"
        },
        {
            id: "skill-os",
            title: "Operating Systems",
            description:
                "Administer Windows Server and Linux distributions (CentOS, Ubuntu, Oracle Linux). Build automated provisioning, patching and compliance workflows.",
            imageUrl: "assets/photos/os.jpg"
        },
        {
            id: "skill-virtualization",
            title: "Virtualization & Cloud",
            description:
                "Operate VMware vSphere, Hyper-V, Citrix Xen, Proxmox and Nutanix. Optimize hybrid environments spanning private clouds and Azure / GCP public clouds.",
            imageUrl: "assets/photos/virtualization.jpg"
        },
        {
            id: "skill-database",
            title: "Database Reliability",
            description:
                "Maintain MSSQL and MySQL Cluster. Build redundancy, backup and monitoring policies to keep data consistent and performant.",
            imageUrl: "assets/photos/database.jpg"
        },
        {
            id: "skill-system",
            title: "System Integration",
            description:
                "Roll out Active Directory, WSUS and Windows Server application services. Centralize identity governance and patch management.",
            imageUrl: "assets/photos/system.jpg"
        },
        {
            id: "skill-storage",
            title: "Storage & Backup",
            description:
                "Support NetApp, Synology and QNAP environments. Design snapshot, off-site backup and storage capacity strategies for critical workloads.",
            imageUrl: "assets/photos/storage.jpg"
        },
        {
            id: "skill-monitoring",
            title: "Observability Platforms",
            description:
                "Deploy MRTG, Prometheus, Grafana, LibreNMS and ELK stacks. Build dashboards, alerting and trend analysis for better service visibility.",
            imageUrl: "assets/photos/monitoring.jpg"
        },
        {
            id: "skill-coding",
            title: "Scripting & Automation",
            description:
                "Create automation with Python, Windows Script Host and Linux shell scripts. Reduce repetitive tasks and deliver reliable operations playbooks.",
            imageUrl: "assets/photos/coding.jpg"
        }
    ];

    const VISUALS = {
        devops: { label: "DevOps Automation", image: "assets/photos/devops.jpg" },
        network: { label: "Enterprise Networking", image: "assets/photos/network.jpg" },
        firewall: { label: "Security & Firewalls", image: "assets/photos/firewall.jpg" },
        switching: { label: "Switching Infrastructure", image: "assets/photos/switching.jpg" },
        os: { label: "Operating Systems", image: "assets/photos/os.jpg" },
        virtualization: { label: "Virtualization & Cloud", image: "assets/photos/virtualization.jpg" },
        database: { label: "Database Reliability", image: "assets/photos/database.jpg" },
        system: { label: "System Integration", image: "assets/photos/system.jpg" },
        storage: { label: "Storage & Backup", image: "assets/photos/storage.jpg" },
        monitoring: { label: "Observability Platforms", image: "assets/photos/monitoring.jpg" },
        coding: { label: "Scripting & Automation", image: "assets/photos/coding.jpg" },
        default: { label: "Skill Illustration", image: "assets/photos/default.jpg" }
    };

    const DEFAULT_PROFILE = {
        name: "[ InchI ]",
        email: "kungyc@gmail.com",
        summary:
            "Delivering reliable infrastructure by combining automation, cloud experience and pragmatic operations improvement.",
        avatar: "assets/photos/profile.jpg"
    };

    const skillGrid = document.getElementById("skillGrid");
    const adminBar = document.getElementById("adminBar");
    const modeStatus = document.getElementById("modeStatus");
    const panelModal = document.getElementById("panelModal");
    const profileModal = document.getElementById("profileModal");

    const openLoginBtn = document.getElementById("openLogin");
    const logoutBtn = document.getElementById("logout");

    const editProfileBtn = document.getElementById("editProfile");
    const openPanelBtn = document.getElementById("openPanel");
    const profileForm = document.getElementById("profileForm");
    const profileNameInput = document.getElementById("profileNameInput");
    const profileEmailInput = document.getElementById("profileEmailInput");
    const profileSummaryInput = document.getElementById("profileSummaryInput");
    const profileAvatarInput = document.getElementById("profileAvatarInput");
    const cancelProfileBtn = document.getElementById("cancelProfile");
    const panelForm = document.getElementById("panelForm");
    const closePanelBtn = document.getElementById("closePanel");
    const fieldTitle = document.getElementById("fieldTitle");
    const fieldDescription = document.getElementById("fieldDescription");
    const fieldImageUrl = document.getElementById("fieldImageUrl");

    const profileNameEl = document.getElementById("profileName");
    const profileEmailEl = document.getElementById("profileEmail");
    const profileSummaryEl = document.getElementById("profileSummary");
    const profileAvatarEl = document.getElementById("profileAvatar");

    if (profileAvatarEl) {
        profileAvatarEl.addEventListener("error", () => {
            if (profileAvatarEl.src.endsWith(DEFAULT_PROFILE.avatar)) return;
            profileAvatarEl.src = DEFAULT_PROFILE.avatar;
        });
    }

    // Firebase tools
    const {
        auth,
        provider,
        signInWithPopup,
        onAuthStateChanged,
        signOut,
        firestore: firestoreTools
    } = window.firebaseTools ?? {};

    let profile = { ...DEFAULT_PROFILE };
    let skills = DEFAULT_SKILLS.map((skill) => ({ ...skill }));
    let isAdmin = sessionStorage.getItem(SESSION_KEY) === "true";

    await hydrateData();
    syncAdminUI();

    if (typeof onAuthStateChanged === "function" && auth) {
        onAuthStateChanged(auth, (user) => {
            if (user && user.email === ADMIN_EMAIL) {
                isAdmin = true;
                sessionStorage.setItem(SESSION_KEY, "true");
            } else {
                isAdmin = false;
                sessionStorage.removeItem(SESSION_KEY);
            }
            syncAdminUI();
        });
    }

    async function hydrateData() {
        const cached = readCachedData();
        if (cached) {
            applyData(cached);
            return;
        }

        const migrated = migrateLegacyStorage();
        if (migrated) {
            applyData(migrated);
            persistData(migrated);
            return;
        }

        await loadRemoteData();
    }

    function readCachedData() {
        const raw = localStorage.getItem(DATA_STORAGE_KEY);
        if (!raw) return null;
        try {
            return normalizeData(JSON.parse(raw));
        } catch (error) {
            console.warn("Failed to parse cached resume data. The cache will be rebuilt.", error);
            return null;
        }
    }

    function migrateLegacyStorage() {
        const legacyProfileRaw = localStorage.getItem(LEGACY_PROFILE_KEY);
        const legacySkillsRaw = localStorage.getItem(LEGACY_SKILLS_KEY);
        if (!legacyProfileRaw && !legacySkillsRaw) return null;

        let profilePayload = {};
        let skillsPayload = [];

        if (legacyProfileRaw) {
            try {
                profilePayload = JSON.parse(legacyProfileRaw) || {};
            } catch (error) {
                console.warn("Failed to parse legacy profile data; using defaults instead.", error);
            }
            localStorage.removeItem(LEGACY_PROFILE_KEY);
        }

        if (legacySkillsRaw) {
            try {
                skillsPayload = JSON.parse(legacySkillsRaw) || [];
            } catch (error) {
                console.warn("Failed to parse legacy skills data; using defaults instead.", error);
            }
            localStorage.removeItem(LEGACY_SKILLS_KEY);
        }

        return normalizeData({
            profile: profilePayload,
            skills: skillsPayload
        });
    }

    async function loadRemoteData() {
        const firestoreData = await loadFirestoreData();
        if (firestoreData) {
            applyData(firestoreData);
            persistData(firestoreData, { skipSync: true });
            return;
        }

        const staticData = await fetchStaticData(STATIC_DATA_URL);
        if (staticData) {
            applyData(staticData);
            persistData(staticData, { skipSync: true });
            return;
        }

        console.warn("Unable to load resume data from Firestore or static JSON; falling back to defaults.");
        const fallback = normalizeData({
            profile: DEFAULT_PROFILE,
            skills: DEFAULT_SKILLS
        });
        applyData(fallback);
        persistData(fallback, { skipSync: true });
    }

    async function loadFirestoreData() {
        if (!firestoreTools?.db || !firestoreTools.doc || !firestoreTools.getDoc) {
            return null;
        }

        try {
            const docRef = getResumeDocRef();
            if (!docRef) return null;

            const snapshot = await firestoreTools.getDoc(docRef);
            if (snapshot?.exists?.()) {
                return normalizeData(snapshot.data());
            }

            const defaults = normalizeData({
                profile: DEFAULT_PROFILE,
                skills: DEFAULT_SKILLS
            });
            await firestoreTools.setDoc(docRef, {
                ...serializeForFirestore(defaults),
                updatedAt: getServerTimestamp()
            });
            return defaults;
        } catch (error) {
            console.warn("Unable to load resume data from Firestore.", error);
            return null;
        }
    }

    async function fetchStaticData(url) {
        try {
            const response = await fetch(url, { cache: "no-store" });
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            const payload = await response.json();
            return normalizeData(payload);
        } catch (error) {
            console.warn(`Unable to load resume data from ${url}.`, error);
            return null;
        }
    }

    function applyData(data) {
        profile = {
            ...DEFAULT_PROFILE,
            ...(data?.profile ?? {})
        };
        skills = normalizeSkills(data?.skills);
    }

    function normalizeData(source) {
        if (!source || typeof source !== "object") {
            return {
                profile: { ...DEFAULT_PROFILE },
                skills: DEFAULT_SKILLS.map((skill) => ({ ...skill }))
            };
        }

        return {
            profile: {
                ...DEFAULT_PROFILE,
                ...(typeof source.profile === "object" && source.profile ? source.profile : {})
            },
            skills: normalizeSkills(source.skills)
        };
    }

    function normalizeSkills(skillsSource) {
        const list = Array.isArray(skillsSource) ? skillsSource : [];
        if (!list.length) {
            return DEFAULT_SKILLS.map((skill) => ({ ...skill }));
        }

        return list.map((skill, index) => {
            const sanitized = {
                ...(typeof skill === "object" && skill ? skill : {})
            };

            const visual = typeof sanitized.visual === "string" ? sanitized.visual.trim() : "";
            const derivedImage = visual && VISUALS[visual]?.image ? VISUALS[visual].image : "";

            const result = {
                id:
                    typeof sanitized.id === "string" && sanitized.id.trim()
                        ? sanitized.id.trim()
                        : `skill-${index + 1}`,
                title:
                    typeof sanitized.title === "string" && sanitized.title.trim()
                        ? sanitized.title.trim()
                        : "Untitled Skill",
                description:
                    typeof sanitized.description === "string"
                        ? sanitized.description
                        : "",
                imageUrl:
                    typeof sanitized.imageUrl === "string" && sanitized.imageUrl.trim()
                        ? sanitized.imageUrl.trim()
                        : derivedImage
            };

            if (visual) {
                result.visual = visual;
            }

            return result;
        });
    }

    function getResumeDocRef() {
        if (!firestoreTools?.db || !firestoreTools.doc) return null;
        return firestoreTools.doc(firestoreTools.db, FIRESTORE_COLLECTION, FIRESTORE_DOC_ID);
    }

    function getServerTimestamp() {
        if (typeof firestoreTools?.serverTimestamp === "function") {
            return firestoreTools.serverTimestamp();
        }
        return Date.now();
    }

    function persistData(override, options = {}) {
        const snapshot = override ?? {
            profile,
            skills
        };
        try {
            localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(snapshot));
        } catch (error) {
            console.warn("Failed to persist resume data to localStorage.", error);
        }

        if (!options.skipSync) {
            syncFirestoreData(snapshot);
        }
    }

    async function syncFirestoreData(payload) {
        if (!firestoreTools?.db || !firestoreTools.setDoc) return;

        const docRef = getResumeDocRef();
        if (!docRef) return;

        try {
            await firestoreTools.setDoc(
                docRef,
                {
                    ...serializeForFirestore(payload),
                    updatedAt: getServerTimestamp()
                },
                { merge: false }
            );
        } catch (error) {
            console.warn("Failed to sync resume data to Firestore.", error);
        }
    }

    function serializeForFirestore(payload) {
        const sanitizedProfile = {
            name: payload.profile?.name ?? DEFAULT_PROFILE.name,
            email: payload.profile?.email ?? DEFAULT_PROFILE.email,
            summary: payload.profile?.summary ?? DEFAULT_PROFILE.summary,
            avatar: payload.profile?.avatar ?? DEFAULT_PROFILE.avatar
        };

        const sanitizedSkills = (payload.skills ?? []).map((skill, index) => {
            const visual = typeof skill.visual === "string" ? skill.visual.trim() : "";
            const base = {
                id:
                    typeof skill.id === "string" && skill.id.trim()
                        ? skill.id.trim()
                        : `skill-${index + 1}`,
                title:
                    typeof skill.title === "string" && skill.title.trim()
                        ? skill.title.trim()
                        : "Untitled Skill",
                description: typeof skill.description === "string" ? skill.description : "",
                imageUrl:
                    typeof skill.imageUrl === "string" && skill.imageUrl.trim()
                        ? skill.imageUrl.trim()
                        : ""
            };
            if (visual) {
                base.visual = visual;
            }
            return base;
        });

        return {
            profile: sanitizedProfile,
            skills: sanitizedSkills
        };
    }

    function loadProfile() {
        return { ...profile };
    }

    function persistProfile() {
        persistData();
    }

    function loadSkills() {
        return skills.map((skill) => ({ ...skill }));
    }
    function persistSkills() {
        persistData();
    }
    function renderProfile() {
        if (profileNameEl) profileNameEl.textContent = profile.name;
        if (profileEmailEl) profileEmailEl.textContent = profile.email;
        if (profileSummaryEl) profileSummaryEl.textContent = profile.summary;
        if (profileAvatarEl) {
            profileAvatarEl.src = profile.avatar || DEFAULT_PROFILE.avatar;
            profileAvatarEl.alt = `${profile.name} 的頭像`;
        }
    }

    function renderSkills() {
        if (!skillGrid) return;
        skillGrid.innerHTML = "";

        skills.forEach((skill) => {
            const imageUrl = skill.imageUrl || VISUALS.default.image;
            const altText = skill.title || VISUALS.default.label;
            const article = document.createElement("article");
            article.className = "skill-card";
            article.dataset.id = skill.id;

            article.innerHTML = `
                <div class="card-inner">
                    <figure class="card-media">
                        <img src="${imageUrl}" alt="${escapeHTML(altText)}">
                    </figure>
                    <div class="card-body">
                        <h3>${escapeHTML(skill.title)}</h3>
                        <div class="card-divider"></div>
                        <p>${escapeHTML(skill.description)}</p>
                        ${isAdmin ? renderCardActions(skill.id) : ""}
                    </div>
                </div>
            `;

            skillGrid.appendChild(article);
        });
    }

    function renderCardActions(id) {
        return `
            <div class="card-actions">
                <button type="button" data-action="edit" data-id="${id}">編輯</button>
                <button type="button" data-action="delete" data-id="${id}">刪除此區塊</button>
            </div>
        `;
    }

    function syncAdminUI() {
        if (!adminBar) return;
        if (adminBar) {
            if (isAdmin) {
                adminBar.hidden = false;
                adminBar.dataset.state = "on";
            } else {
                adminBar.hidden = true;
                adminBar.dataset.state = "off";
            }
        }
        if (modeStatus) {
            modeStatus.textContent = isAdmin ? "管理模式開啟" : "";
        }
        if (!isAdmin) {
            closeDialog(panelModal);
            closeDialog(profileModal);
        }
        if (openLoginBtn) openLoginBtn.hidden = isAdmin;
        if (editProfileBtn) editProfileBtn.hidden = !isAdmin;
        renderProfile();
        renderSkills();
    }

    function openDialog(dialog) {
        if (!dialog) return;
        if (typeof dialog.showModal === "function") {
            dialog.showModal();
        } else {
            dialog.setAttribute("open", "true");
        }
    }

    function closeDialog(dialog) {
        if (!dialog) return;
        if (dialog.open) {
            dialog.close();
        } else {
            dialog.removeAttribute("open");
        }
    }

    openLoginBtn?.addEventListener("click", () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                if (user.email !== ADMIN_EMAIL) {
                    alert("You are not authorized to login.");
                    signOut(auth);
                }
            })
            .catch((error) => {
                console.error("Login failed:", error);
            });
    });

    logoutBtn?.addEventListener("click", () => {
        signOut(auth);
    });

    openPanelBtn?.addEventListener("click", () => {
        if (!isAdmin) return;
        panelForm?.reset();
        delete panelForm.dataset.editingId; // Clear editing state

        // Update modal UI for adding
        panelModal.querySelector("h2").textContent = "新增技術區塊";
        panelModal.querySelector("button[type='submit']").textContent = "新增";

        openDialog(panelModal);
        fieldTitle?.focus();
    });

    closePanelBtn?.addEventListener("click", () => closeDialog(panelModal));

    panelForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        const editingId = panelForm.dataset.editingId;

        const title = fieldTitle.value.trim();
        const description = fieldDescription.value.trim();
        const imageUrl = fieldImageUrl.value.trim();

        if (!title || !description) return;

        if (editingId) {
            // Edit existing skill
            const skillIndex = skills.findIndex(skill => skill.id === editingId);
            if (skillIndex > -1) {
                skills[skillIndex] = { ...skills[skillIndex], title, description, imageUrl };
            }
        } else {
            // Add new skill
            const newSkill = { id: `skill-${Date.now()}`, title, description, imageUrl };
            skills = [newSkill, ...skills];
        }

        persistSkills();
        renderSkills();
        closeDialog(panelModal);
    });

    editProfileBtn?.addEventListener("click", () => {
        if (!isAdmin) return;
        profileNameInput.value = profile.name;
        profileEmailInput.value = profile.email;
        profileSummaryInput.value = profile.summary;
        profileAvatarInput.value = profile.avatar === DEFAULT_PROFILE.avatar ? "" : profile.avatar;
        openDialog(profileModal);
        profileNameInput.focus();
    });

    cancelProfileBtn?.addEventListener("click", () => closeDialog(profileModal));

    profileForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        profile = {
            name: profileNameInput.value.trim() || DEFAULT_PROFILE.name,
            email: profileEmailInput.value.trim() || DEFAULT_PROFILE.email,
            summary: profileSummaryInput.value.trim() || DEFAULT_PROFILE.summary,
            avatar: profileAvatarInput.value.trim() || DEFAULT_PROFILE.avatar
        };
        persistProfile();
        renderProfile();
        closeDialog(profileModal);
    });

    skillGrid?.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement) || !isAdmin) return;

        const action = target.dataset.action;
        const id = target.dataset.id;

        if (action === "delete" && id) {
            if (!window.confirm("您確定要刪除此區塊嗎？")) return;
            skills = skills.filter((skill) => skill.id !== id);
            persistSkills();
            renderSkills();
        }

        if (action === "edit" && id) {
            const skillToEdit = skills.find((skill) => skill.id === id);
            if (!skillToEdit) return;

            // Populate the modal for editing
            fieldTitle.value = skillToEdit.title;
            fieldDescription.value = skillToEdit.description;
            fieldImageUrl.value = skillToEdit.imageUrl || "";

            // Set identifier for edit mode
            panelForm.dataset.editingId = id;

            openDialog(panelModal);
        }
    });

    function escapeHTML(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
})();
