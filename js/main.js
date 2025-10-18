(async () => {
    const STATIC_DATA_URL = "db/data.json";
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
    const skillTagsContainer = document.getElementById("skillTagsContainer");
    const adminBar = document.getElementById("adminBar");
    const modeStatus = document.getElementById("modeStatus");
    const panelModal = document.getElementById("panelModal");
    const profileModal = document.getElementById("profileModal");
    const skillTagsModal = document.getElementById("skillTagsModal");

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
    const projectManagerModal = document.getElementById("projectManagerModal");
    const projectManagerTitle = document.getElementById("projectManagerTitle");
    const closeProjectManagerBtn = document.getElementById("closeProjectManager");
    const projectListEl = document.getElementById("projectList");
    const addProjectBtn = document.getElementById("addProject");
    const projectEditorModal = document.getElementById("projectEditorModal");
    const projectEditorTitle = document.getElementById("projectEditorTitle");
    const projectForm = document.getElementById("projectForm");
    const projectNameInput = document.getElementById("projectNameInput");
    const projectSummaryInput = document.getElementById("projectSummaryInput");
    const projectMediaList = document.getElementById("projectMediaList");
    const addMediaItemBtn = document.getElementById("addMediaItem");
    const cancelProjectBtn = document.getElementById("cancelProject");
    const skillDetailModal = document.getElementById("skillDetailModal");
    const detailSkillTitle = document.getElementById("detailSkillTitle");
    const detailSkillIntro = document.getElementById("detailSkillIntro");
    const detailProjectContainer = document.getElementById("detailProjectContainer");
    const closeSkillDetailBtn = document.getElementById("closeSkillDetail");
    const imagePreviewModal = document.getElementById("imagePreviewModal");
    const imagePreviewImg = document.getElementById("imagePreviewImg");
    const imagePreviewTitle = document.getElementById("imagePreviewTitle");
    const closeImagePreviewBtn = document.getElementById("closeImagePreview");
    const editSkillTagsBtn = document.getElementById("editSkillTags");
    const closeSkillTagsBtn = document.getElementById("closeSkillTags");
    const skillTagsList = document.getElementById("skillTagsList");
    const newSkillTagInput = document.getElementById("newSkillTagInput");
    const addSkillTagBtn = document.getElementById("addSkillTag");

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
    let skillTags = [];
    let isAdmin = sessionStorage.getItem(SESSION_KEY) === "true";
    let activeSkillId = null;
    let editingProjectId = null;

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
        const payload = await loadRemoteData();
        applyData(payload);
    }

    async function loadRemoteData() {
        const firestoreData = await loadFirestoreData();
        if (firestoreData) {
            return firestoreData;
        }

        const staticData = await fetchStaticData(STATIC_DATA_URL);
        if (staticData) {
            return staticData;
        }

        console.warn("Unable to load resume data from Firestore or static JSON; falling back to defaults.");
        return normalizeData({
            profile: DEFAULT_PROFILE,
            skills: DEFAULT_SKILLS
        });
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
        skillTags = Array.isArray(data?.skillTags) ? data.skillTags : [];
    }

    function normalizeData(source) {
        if (!source || typeof source !== "object") {
            return {
                profile: { ...DEFAULT_PROFILE },
                skills: DEFAULT_SKILLS.map((skill) => ({ ...skill })),
                skillTags: []
            };
        }

        return {
            profile: {
                ...DEFAULT_PROFILE,
                ...(typeof source.profile === "object" && source.profile ? source.profile : {})
            },
            skills: normalizeSkills(source.skills),
            skillTags: Array.isArray(source.skillTags) ? source.skillTags : []
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
                        : derivedImage,
                projects: normalizeProjects(sanitized.projects)
            };

            if (visual) {
                result.visual = visual;
            }

            return result;
        });
    }

    function normalizeProjects(projectSource) {
        const list = Array.isArray(projectSource) ? projectSource : [];
        return list.map((project, index) => {
            const payload = {
                ...(typeof project === "object" && project ? project : {})
            };
            const id =
                typeof payload.id === "string" && payload.id.trim()
                    ? payload.id.trim()
                    : `project-${index + 1}`;
            return {
                id,
                name:
                    typeof payload.name === "string" && payload.name.trim()
                        ? payload.name.trim()
                        : `Untitled Project ${index + 1}`,
                summary:
                    typeof payload.summary === "string"
                        ? payload.summary
                        : "",
                media: normalizeMedia(payload.media),
                createdAt: payload.createdAt || "",
                updatedAt: payload.updatedAt || ""
            };
        });
    }

    function normalizeMedia(mediaSource) {
        const list = Array.isArray(mediaSource) ? mediaSource : [];
        return list
            .map((item, index) => {
                const payload = {
                    ...(typeof item === "object" && item ? item : {})
                };
                const type =
                    payload.type === "file" || payload.type === "image"
                        ? payload.type
                        : "image";
                const url = typeof payload.url === "string" ? payload.url.trim() : "";
                if (!url) return null;
                return {
                    id:
                        typeof payload.id === "string" && payload.id.trim()
                            ? payload.id.trim()
                            : `media-${index + 1}`,
                    type,
                    url,
                    label:
                        typeof payload.label === "string" && payload.label.trim()
                            ? payload.label.trim()
                            : ""
                };
            })
            .filter(Boolean);
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
            skills,
            skillTags
        };

        if (!options.skipSync) {
            syncFirestoreData(snapshot);
        }

        return snapshot;
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
                        : "",
                projects: serializeProjects(skill.projects, index)
            };
            if (visual) {
                base.visual = visual;
            }
            return base;
        });

        return {
            profile: sanitizedProfile,
            skills: sanitizedSkills,
            skillTags: Array.isArray(payload.skillTags) ? payload.skillTags : []
        };
    }

    function serializeProjects(projectSource, skillIndex = 0) {
        const list = Array.isArray(projectSource) ? projectSource : [];
        return list.map((project, index) => {
            const payload = {
                ...(typeof project === "object" && project ? project : {})
            };
            const id =
                typeof payload.id === "string" && payload.id.trim()
                    ? payload.id.trim()
                    : `project-${skillIndex + 1}-${index + 1}`;
            return {
                id,
                name:
                    typeof payload.name === "string" && payload.name.trim()
                        ? payload.name.trim()
                        : `Untitled Project ${index + 1}`,
                summary: typeof payload.summary === "string" ? payload.summary : "",
                media: serializeMedia(payload.media),
                createdAt:
                    typeof payload.createdAt === "string" && payload.createdAt.trim()
                        ? payload.createdAt.trim()
                        : "",
                updatedAt:
                    typeof payload.updatedAt === "string" && payload.updatedAt.trim()
                        ? payload.updatedAt.trim()
                        : new Date().toISOString()
            };
        });
    }

    function serializeMedia(mediaSource) {
        const list = Array.isArray(mediaSource) ? mediaSource : [];
        return list
            .map((item, index) => {
                const payload = {
                    ...(typeof item === "object" && item ? item : {})
                };
                const url = typeof payload.url === "string" ? payload.url.trim() : "";
                if (!url) return null;
                const type =
                    payload.type === "file" || payload.type === "image"
                        ? payload.type
                        : "image";
                return {
                    id:
                        typeof payload.id === "string" && payload.id.trim()
                            ? payload.id.trim()
                            : `media-${index + 1}`,
                    type,
                    url,
                    label:
                        typeof payload.label === "string" && payload.label.trim()
                            ? payload.label.trim()
                            : ""
                };
            })
            .filter(Boolean);
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

    function renderSkillTags() {
        if (!skillTagsContainer) return;
        skillTagsContainer.innerHTML = "";

        if (!skillTags || skillTags.length === 0) return;

        skillTags.forEach((tag) => {
            const span = document.createElement("span");
            span.className = "skill-tag";
            span.textContent = tag;

            // 產生隨機 HSL 顏色：固定飽和度和亮度，只改變色相
            const hue = Math.floor(Math.random() * 360);
            const saturation = 70;
            const lightness = 85;
            span.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

            skillTagsContainer.appendChild(span);
        });
    }

    function renderCardActions(id) {
        return `
            <div class="card-actions">
                <button type="button" data-action="projects" data-id="${id}">Manage Projects</button>
                <button type="button" data-action="edit" data-id="${id}">Edit</button>
                <button type="button" data-action="delete" data-id="${id}">Delete</button>
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
        if (editSkillTagsBtn) editSkillTagsBtn.hidden = !isAdmin;
        renderProfile();
        renderSkillTags();
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

        persistData();
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
        persistData();
        renderProfile();
        closeDialog(profileModal);
    });

    closeProjectManagerBtn?.addEventListener("click", () => {
        activeSkillId = null;
        closeDialog(projectManagerModal);
    });

    addProjectBtn?.addEventListener("click", () => {
        if (!activeSkillId) return;
        openProjectEditor();
    });

    cancelProjectBtn?.addEventListener("click", () => {
        editingProjectId = null;
        closeDialog(projectEditorModal);
    });

    addMediaItemBtn?.addEventListener("click", () => {
        addMediaRow();
    });

    projectMediaList?.addEventListener("click", (event) => {
        const removeBtn = event.target instanceof HTMLElement ? event.target.closest(".media-remove") : null;
        if (!removeBtn) return;
        const item = removeBtn.closest(".media-item");
        item?.remove();
    });

    projectListEl?.addEventListener("click", (event) => {
        const button = event.target instanceof HTMLElement ? event.target.closest("button[data-project-action]") : null;
        if (!button) return;
        const skill = getSkillById(activeSkillId);
        if (!skill) return;

        const projectId = button.dataset.projectId;
        if (!projectId) return;

        const action = button.dataset.projectAction;
        if (action === "edit") {
            const projectToEdit = skill.projects.find((project) => project.id === projectId);
            if (!projectToEdit) return;
            openProjectEditor(projectToEdit);
        }

        if (action === "delete") {
            if (!window.confirm("Are you sure you want to delete this project?")) return;
            skill.projects = skill.projects.filter((project) => project.id !== projectId);
            persistData();
            renderProjectManager();
            if (skillDetailModal?.open) {
                renderSkillDetail(skill);
            }
        }
    });

    projectForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!activeSkillId) return;

        const skill = getSkillById(activeSkillId);
        if (!skill) return;

        const name = projectNameInput.value.trim();
        const summary = projectSummaryInput.value.trim();
        if (!name) {
            projectNameInput.focus();
            return;
        }

        const media = collectMediaItems();
        const now = new Date().toISOString();

        if (!Array.isArray(skill.projects)) {
            skill.projects = [];
        }

        if (editingProjectId) {
            const projectIndex = skill.projects.findIndex((project) => project.id === editingProjectId);
            if (projectIndex > -1) {
                skill.projects[projectIndex] = {
                    ...skill.projects[projectIndex],
                    name,
                    summary,
                    media,
                    updatedAt: now
                };
            }
        } else {
            skill.projects.push({
                id: generateId("project"),
                name,
                summary,
                media,
                createdAt: now,
                updatedAt: now
            });
        }

        persistData();
        renderProjectManager();
        if (skillDetailModal?.open) {
            renderSkillDetail(skill);
        }
        closeDialog(projectEditorModal);
        editingProjectId = null;
    });

    closeSkillDetailBtn?.addEventListener("click", () => {
        closeDialog(skillDetailModal);
    });

    closeImagePreviewBtn?.addEventListener("click", () => {
        closeDialog(imagePreviewModal);
    });

    // 圖片預覽和檔案下載事件處理
    detailProjectContainer?.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;

        // 處理圖片點擊預覽
        if (target.tagName === "IMG" && target.dataset.mediaType === "image") {
            const imageUrl = target.dataset.mediaUrl;
            const imageLabel = target.dataset.mediaLabel || "圖片預覽";
            if (imageUrl && imagePreviewImg && imagePreviewTitle) {
                imagePreviewImg.src = imageUrl;
                imagePreviewTitle.textContent = imageLabel;
                openDialog(imagePreviewModal);
            }
            return;
        }

        // 處理檔案下載
        if (target.tagName === "A" && target.dataset.mediaType === "file") {
            // 瀏覽器會自動處理 download 屬性
            return;
        }

        // 管理員專案編輯/刪除按鈕
        if (!isAdmin) return;
        const button = target.closest("button[data-detail-action]");
        if (!button) return;

        const action = button.dataset.detailAction;
        const skillId = button.dataset.skillId;
        const projectId = button.dataset.projectId;

        if (!skillId || !projectId) return;

        const skill = getSkillById(skillId);
        if (!skill) return;

        if (action === "edit") {
            const projectToEdit = skill.projects.find((project) => project.id === projectId);
            if (!projectToEdit) return;
            activeSkillId = skillId;
            openProjectEditor(projectToEdit);
        }

        if (action === "delete") {
            if (!window.confirm("確定要刪除此專案嗎？")) return;
            skill.projects = skill.projects.filter((project) => project.id !== projectId);
            persistData();
            renderSkillDetail(skill);
        }
    });

    skillGrid?.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;

        const action = target.dataset.action;
        const id = target.dataset.id;

        if (action && isAdmin) {
            if (action === "delete" && id) {
                if (!window.confirm("Are you sure you want to delete this skill?")) return;
                skills = skills.filter((skill) => skill.id !== id);
                persistData();
                renderSkills();
                return;
            }

            if (action === "edit" && id) {
                const skillToEdit = getSkillById(id);
                if (!skillToEdit) return;
                fieldTitle.value = skillToEdit.title;
                fieldDescription.value = skillToEdit.description;
                fieldImageUrl.value = skillToEdit.imageUrl || "";
                panelForm.dataset.editingId = id;
                openDialog(panelModal);
                return;
            }

            if (action === "projects" && id) {
                openProjectManager(id);
                return;
            }
        }

        if (target.closest(".card-actions")) return;

        const card = target.closest(".skill-card");
        if (!card) return;
        const skillId = card.dataset.id;
        const skill = getSkillById(skillId);
        if (!skill) return;
        openSkillDetail(skill);
    });

    // 技能標籤管理
    editSkillTagsBtn?.addEventListener("click", () => {
        if (!isAdmin) return;
        renderSkillTagsManager();
        openDialog(skillTagsModal);
        newSkillTagInput?.focus();
    });

    closeSkillTagsBtn?.addEventListener("click", () => {
        closeDialog(skillTagsModal);
    });

    addSkillTagBtn?.addEventListener("click", () => {
        const newTag = newSkillTagInput?.value.trim();
        if (!newTag) return;

        if (skillTags.includes(newTag)) {
            alert("此標籤已存在！");
            return;
        }

        skillTags.push(newTag);
        persistData();
        renderSkillTags();
        renderSkillTagsManager();
        newSkillTagInput.value = "";
        newSkillTagInput.focus();
    });

    newSkillTagInput?.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addSkillTagBtn?.click();
        }
    });

    skillTagsList?.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;

        const removeBtn = target.closest(".skill-tag-remove");
        if (!removeBtn) return;

        const tagText = removeBtn.dataset.tag;
        if (!tagText) return;

        if (!window.confirm(`確定要刪除標籤「${tagText}」嗎？`)) return;

        skillTags = skillTags.filter(tag => tag !== tagText);
        persistData();
        renderSkillTags();
        renderSkillTagsManager();
    });

    function renderSkillTagsManager() {
        if (!skillTagsList) return;
        skillTagsList.innerHTML = "";

        if (!skillTags || skillTags.length === 0) {
            return;
        }

        skillTags.forEach((tag) => {
            const div = document.createElement("div");
            div.className = "skill-tag-item";

            const hue = Math.floor(Math.random() * 360);
            const saturation = 70;
            const lightness = 85;
            div.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

            const span = document.createElement("span");
            span.textContent = tag;

            const removeBtn = document.createElement("button");
            removeBtn.className = "skill-tag-remove";
            removeBtn.type = "button";
            removeBtn.textContent = "×";
            removeBtn.dataset.tag = tag;
            removeBtn.setAttribute("aria-label", `刪除標籤 ${tag}`);

            div.appendChild(span);
            div.appendChild(removeBtn);
            skillTagsList.appendChild(div);
        });
    }

    function getSkillById(id) {
        if (!id) return null;
        return skills.find((skill) => skill.id === id) ?? null;
    }

    function openProjectManager(skillId) {
        const skill = getSkillById(skillId);
        if (!skill) return;
        activeSkillId = skill.id;
        editingProjectId = null;
        renderProjectManager();
        openDialog(projectManagerModal);
    }

    function renderProjectManager() {
        if (!projectListEl) return;
        const skill = getSkillById(activeSkillId);
        if (!skill) return;
        projectManagerTitle.textContent = `${skill.title} - Projects`;

        if (!skill.projects || !skill.projects.length) {
            projectListEl.innerHTML = `<div class="project-empty">No projects yet. Click "Add Project" to begin.</div>`;
            return;
        }

        const sorted = [...skill.projects].sort((a, b) => a.name.localeCompare(b.name, "zh-Hant"));
        projectListEl.innerHTML = sorted
            .map((project) => {
                const plain = truncate(stripMarkdown(project.summary || ""), 120);
                return `
                    <article class="project-item" data-project-id="${project.id}">
                        <div class="project-item__header">
                            <div class="project-item__name">${escapeHTML(project.name)}</div>
                            <div class="project-item__actions">
                                <button type="button" class="admin-btn" data-project-action="edit" data-project-id="${project.id}">Edit</button>
                                <button type="button" class="admin-btn admin-btn--quiet" data-project-action="delete" data-project-id="${project.id}">Delete</button>
                            </div>
                        </div>
                        <div class="project-item__intro">${escapeHTML(plain)}</div>
                        <div class="project-item__meta">Media: ${project.media.length}</div>
                    </article>
                `;
            })
            .join("");
    }

    function openProjectEditor(project) {
        if (!projectForm) return;
        projectForm.reset();
        editingProjectId = project?.id ?? null;
        projectEditorTitle.textContent = editingProjectId ? "Edit Project" : "Add Project";
        projectNameInput.value = project?.name ?? "";
        projectSummaryInput.value = project?.summary ?? "";
        projectMediaList.innerHTML = "";
        const mediaItems = project?.media?.length ? project.media : [];
        if (mediaItems.length) {
            mediaItems.forEach((item) => addMediaRow(item));
        } else {
            addMediaRow();
        }
        openDialog(projectEditorModal);
    }

    function addMediaRow(media) {
        if (!projectMediaList) return;
        const row = document.createElement("div");
        row.className = "media-item";
        row.dataset.mediaId = media?.id ?? generateId("media");

        const typeSelect = document.createElement("select");
        typeSelect.innerHTML = `
            <option value="image">Image</option>
            <option value="file">File</option>
        `;
        typeSelect.value = media?.type === "file" ? "file" : "image";

        const urlInput = document.createElement("input");
        urlInput.type = "text";
        urlInput.placeholder = "https://example.com/resource";
        urlInput.value = media?.url ?? "";

        const labelInput = document.createElement("input");
        labelInput.type = "text";
        labelInput.placeholder = "Optional description";
        labelInput.value = media?.label ?? "";

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "media-remove";
        removeBtn.setAttribute("aria-label", "Remove media");
        removeBtn.textContent = "×";

        row.append(typeSelect, urlInput, labelInput, removeBtn);
        projectMediaList.appendChild(row);
        return row;
    }

    function collectMediaItems() {
        if (!projectMediaList) return [];
        const rows = Array.from(projectMediaList.querySelectorAll(".media-item"));
        return rows
            .map((row) => {
                const select = row.querySelector("select");
                const [urlInput, labelInput] = row.querySelectorAll("input");
                const url = urlInput?.value.trim();
                if (!url) return null;
                return {
                    id: row.dataset.mediaId || generateId("media"),
                    type: select?.value === "file" ? "file" : "image",
                    url,
                    label: labelInput?.value.trim() ?? ""
                };
            })
            .filter(Boolean);
    }

    function openSkillDetail(skill) {
        renderSkillDetail(skill);
        openDialog(skillDetailModal);
    }

    function renderSkillDetail(skill) {
        if (!detailSkillTitle || !detailProjectContainer || !detailSkillIntro) return;
        detailSkillTitle.textContent = skill.title;
        detailSkillIntro.innerHTML = `<p>${escapeHTML(skill.description || "")}</p>`;

        if (!skill.projects || !skill.projects.length) {
            detailProjectContainer.innerHTML = `<div class="project-empty">No projects have been added for this skill yet.</div>`;
            return;
        }

        detailProjectContainer.innerHTML = skill.projects
            .map((project) => {
                const mediaHtml = project.media.length
                    ? `<div class="project-media-gallery">
                        ${project.media
                            .map((item) => renderProjectMedia(item))
                            .join("")}
                       </div>`
                    : "";
                const markdown = renderMarkdownToHTML(project.summary || "");
                const actionsHtml = isAdmin
                    ? `<div class="detail-project__actions">
                        <button type="button" class="detail-project__btn" data-detail-action="edit" data-skill-id="${skill.id}" data-project-id="${project.id}">編輯</button>
                        <button type="button" class="detail-project__btn detail-project__btn--delete" data-detail-action="delete" data-skill-id="${skill.id}" data-project-id="${project.id}">刪除</button>
                       </div>`
                    : "";
                return `
                    <article class="detail-project" data-project-id="${project.id}">
                        <div class="detail-project__header">
                            <h3>${escapeHTML(project.name)}</h3>
                            ${actionsHtml}
                        </div>
                        ${mediaHtml}
                        <div class="markdown-body">${markdown}</div>
                    </article>
                `;
            })
            .join("");
    }

    function renderProjectMedia(media) {
        if (media.type === "file") {
            const label = media.label ? `<div class="project-media-label">${escapeHTML(media.label)}</div>` : "";
            return `
                <div class="project-media-card project-media-card--file">
                    ${label}
                    <a href="${escapeAttribute(media.url)}" download data-media-type="file"><img src="assets/photos/file.svg" alt="file icon" class="file-icon">${escapeHTML(media.label || media.url)}</a>
                </div>
            `;
        }
        const label = media.label ? `<div class="project-media-label">${escapeHTML(media.label)}</div>` : "";
        return `
            <div class="project-media-card">
                <img src="${escapeAttribute(media.url)}" alt="${escapeHTML(media.label || media.url)}" data-media-type="image" data-media-url="${escapeAttribute(media.url)}" data-media-label="${escapeHTML(media.label || '')}">
                ${label}
            </div>
        `;
    }

    function renderMarkdownToHTML(markdown) {
        const safe = escapeHTML(markdown ?? "");
        if (!safe.trim()) return "<p>No project description provided.</p>";

        const lines = safe.split(/\r?\n/);
        let html = "";
        let inList = false;

        const closeList = () => {
            if (inList) {
                html += "</ul>";
                inList = false;
            }
        };

        lines.forEach((line) => {
            if (/^\s*-\s+/.test(line)) {
                if (!inList) {
                    html += "<ul>";
                    inList = true;
                }
                const content = line.replace(/^\s*-\s+/, "");
                html += `<li>${applyInlineMarkdown(content)}</li>`;
                return;
            }

            closeList();

            if (/^###\s+/.test(line)) {
                html += `<h4>${applyInlineMarkdown(line.replace(/^###\s+/, ""))}</h4>`;
            } else if (/^##\s+/.test(line)) {
                html += `<h3>${applyInlineMarkdown(line.replace(/^##\s+/, ""))}</h3>`;
            } else if (/^#\s+/.test(line)) {
                html += `<h2>${applyInlineMarkdown(line.replace(/^#\s+/, ""))}</h2>`;
            } else if (line.trim() === "") {
                html += "<p></p>";
            } else {
                html += `<p>${applyInlineMarkdown(line)}</p>`;
            }
        });

        closeList();
        return html;
    }

    function applyInlineMarkdown(text) {
        return text
            .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.+?)\*/g, "<em>$1</em>")
            .replace(/`(.+?)`/g, "<code>$1</code>")
            .replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    }

    function stripMarkdown(text) {
        return (text || "")
            .replace(/```[\s\S]*?```/g, "")
            .replace(/`([^`]+)`/g, "$1")
            .replace(/\*\*(.+?)\*\*/g, "$1")
            .replace(/\*(.+?)\*/g, "$1")
            .replace(/\[(.+?)\]\((.+?)\)/g, "$1")
            .replace(/^#{1,6}\s*/gm, "")
            .replace(/^\s*-\s+/gm, "")
            .replace(/\r?\n/g, " ")
            .trim();
    }

    function truncate(text, length = 120) {
        if (!text) return "";
        return text.length > length ? `${text.slice(0, length)}…` : text;
    }

    function generateId(prefix) {
        if (typeof crypto?.randomUUID === "function") {
            return `${prefix}-${crypto.randomUUID()}`;
        }
        return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }

    function escapeHTML(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function escapeAttribute(value) {
        return escapeHTML(value);
    }
})();
