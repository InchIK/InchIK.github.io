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
    const projectNavigationList = document.getElementById("projectNavigationList");
    const detailProjectContainer = document.getElementById("detailProjectContainer");
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
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

    const editAboutMeBtn = document.getElementById("editAboutMe");
    const aboutMeModal = document.getElementById("aboutMeModal");
    const closeAboutMeBtn = document.getElementById("closeAboutMe");
    const saveAboutMeBtn = document.getElementById("saveAboutMe");
    const aboutLocationEl = document.getElementById("aboutLocation");
    const experienceListEl = document.getElementById("experienceList");
    const educationListEl = document.getElementById("educationList");
    const certificateListEl = document.getElementById("certificateList");
    const websiteListEl = document.getElementById("websiteList");
    const aboutLocationInput = document.getElementById("aboutLocationInput");
    const experienceManagerList = document.getElementById("experienceManagerList");
    const positionManagerList = document.getElementById("positionManagerList");
    const educationManagerList = document.getElementById("educationManagerList");
    const certificateManagerList = document.getElementById("certificateManagerList");
    const websiteManagerList = document.getElementById("websiteManagerList");
    const addExperienceBtn = document.getElementById("addExperience");
    const addEducationBtn = document.getElementById("addEducation");
    const addCertificateBtn = document.getElementById("addCertificate");
    const addWebsiteBtn = document.getElementById("addWebsite");

    const editShareLinksBtn = document.getElementById("editShareLinks");
    const shareLinksModal = document.getElementById("shareLinksModal");
    const closeShareLinksBtn = document.getElementById("closeShareLinks");
    const saveShareLinksBtn = document.getElementById("saveShareLinks");
    const shareLinksGrid = document.getElementById("shareLinksGrid");
    const shareLinksManagerList = document.getElementById("shareLinksManagerList");
    const addShareLinkBtn = document.getElementById("addShareLink");
    const editAdminTagsBtn = document.getElementById("editAdminTags");
    const adminTagModal = document.getElementById("adminTagModal");
    const closeAdminTagModalBtn = document.getElementById("closeAdminTagModal");
    const adminTagForm = document.getElementById("adminTagForm");
    const adminTagList = document.getElementById("adminTagList");
    const adminTagTextInput = document.getElementById("adminTagTextInput");
    const adminTagFrontBgInput = document.getElementById("adminTagFrontBgInput");
    const adminTagFrontPreview = document.getElementById("adminTagFrontPreview");
    const adminTagBackBgInput = document.getElementById("adminTagBackBgInput");
    const adminTagBackPreview = document.getElementById("adminTagBackPreview");
    const adminTagFrontValue = document.getElementById("adminTagFrontValue");
    const adminTagBackValue = document.getElementById("adminTagBackValue");
    const adminTagFrontRandomBtn = document.getElementById("adminTagFrontRandom");
    const adminTagBackRandomBtn = document.getElementById("adminTagBackRandom");
    const cancelAdminTagBtn = document.getElementById("cancelAdminTag");

    const openMessageModalBtn = document.getElementById("openMessageModal");
    const messageModal = document.getElementById("messageModal");
    const closeMessageBtn = document.getElementById("closeMessage");
    const cancelMessageBtn = document.getElementById("cancelMessage");
    const messageForm = document.getElementById("messageForm");
    const messageStatusEl = document.getElementById("messageStatus");

    const profileNameEl = document.getElementById("profileName");
    const customAdminTagsContainer = document.getElementById("customAdminTags");
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
    let aboutMe = {
        location: "",
        experiences: [],
        positions: [],
        education: [],
        certificates: [],
        websites: []
    };
    const ADMIN_TAG_FRONT_COLORS = ["#FFFFFF", "#E0E0E0", "#FFED97", "#DEDEBE"];
    const ADMIN_TAG_BACK_COLORS = ["#EA0000", "#FF8000", "#E1E100", "#00BB00", "#0000E3", "#6F00D2", "#AE00AE"];
    let shareLinks = [];
    let adminTags = [];
    let isAdmin = sessionStorage.getItem(SESSION_KEY) === "true";
    let activeSkillId = null;
    let editingProjectId = null;

    resetAdminTagForm();

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
        aboutMe = normalizeAboutMe(data?.aboutMe);
        shareLinks = normalizeShareLinks(data?.shareLinks);
        adminTags = normalizeAdminTags(data?.adminTags);
        console.log("applyData 後的 shareLinks:", shareLinks);
    }

    function normalizeData(source) {
        if (!source || typeof source !== "object") {
            return {
                profile: { ...DEFAULT_PROFILE },
                skills: DEFAULT_SKILLS.map((skill) => ({ ...skill })),
                skillTags: [],
                aboutMe: {
                    location: "",
                    experiences: [],
                    positions: [],
                    education: [],
                    certificates: [],
                    websites: []
                },
                shareLinks: [],
                adminTags: []
            };
        }

        return {
            profile: {
                ...DEFAULT_PROFILE,
                ...(typeof source.profile === "object" && source.profile ? source.profile : {})
            },
            skills: normalizeSkills(source.skills),
            skillTags: Array.isArray(source.skillTags) ? source.skillTags : [],
            aboutMe: normalizeAboutMe(source.aboutMe),
            shareLinks: normalizeShareLinks(source.shareLinks),
            adminTags: normalizeAdminTags(source.adminTags)
        };
    }

    function normalizeAboutMe(source) {
        if (!source || typeof source !== "object") {
            return {
                location: "",
                experiences: [],
                positions: [],
                education: [],
                certificates: [],
                websites: []
            };
        }

        return {
            location: typeof source.location === "string" ? source.location : "",
            experiences: Array.isArray(source.experiences) ? source.experiences.map((exp, i) => ({
                id: exp.id || `exp-${i + 1}`,
                company: exp.company || "",
                years: exp.years || "",
                skills: Array.isArray(exp.skills) ? exp.skills : []
            })) : [],
            positions: Array.isArray(source.positions) ? source.positions.filter(p => typeof p === "string" && p.trim()) : [],
            education: Array.isArray(source.education) ? source.education.map((edu, i) => ({
                id: edu.id || `edu-${i + 1}`,
                school: edu.school || "",
                degree: edu.degree || ""
            })) : [],
            certificates: Array.isArray(source.certificates) ? source.certificates.map((cert, i) => ({
                id: cert.id || `cert-${i + 1}`,
                title: cert.title || "",
                imageUrl: cert.imageUrl || "",
                description: cert.description || ""
            })) : [],
            websites: Array.isArray(source.websites) ? source.websites.map((web, i) => ({
                id: web.id || `web-${i + 1}`,
                label: web.label || "",
                url: web.url || "",
                icon: web.icon || ""
            })) : []
        };
    }

    function normalizeShareLinks(source) {
        if (!Array.isArray(source)) return [];

        return source.map((link, i) => ({
            id: link.id || `share-${i + 1}`,
            name: link.name || "",
            description: link.description || "",
            url: link.url || ""
        })).filter(link => link.name); // 只要有名稱就保留
    }

    function normalizeAdminTags(source) {
        if (!Array.isArray(source)) return [];

        return source
            .map((tag) => {
                if (!tag || typeof tag !== "object") return null;
                const text = typeof tag.text === "string" ? tag.text.trim() : "";
                const frontBg = typeof tag.frontBg === "string" ? tag.frontBg.trim() : "";
                const backBg = typeof tag.backBg === "string" ? tag.backBg.trim() : "";
                if (!text) return null;
                return { text, frontBg, backBg };
            })
            .filter(Boolean);
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
            skillTags,
            aboutMe,
            shareLinks,
            adminTags
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

        const sanitizedAboutMe = {
            location: payload.aboutMe?.location || "",
            experiences: Array.isArray(payload.aboutMe?.experiences) ? payload.aboutMe.experiences : [],
            positions: Array.isArray(payload.aboutMe?.positions) ? payload.aboutMe.positions : [],
            education: Array.isArray(payload.aboutMe?.education) ? payload.aboutMe.education : [],
            certificates: Array.isArray(payload.aboutMe?.certificates) ? payload.aboutMe.certificates : [],
            websites: Array.isArray(payload.aboutMe?.websites) ? payload.aboutMe.websites : []
        };

        const sanitizedShareLinks = Array.isArray(payload.shareLinks)
            ? payload.shareLinks.map(link => ({
                id: link.id || "",
                name: link.name || "",
                description: link.description || "",
                url: link.url || ""
            })).filter(link => link.name) // 只要有名稱就保留
            : [];
        const sanitizedAdminTags = normalizeAdminTags(payload.adminTags);

        return {
            profile: sanitizedProfile,
            skills: sanitizedSkills,
            skillTags: Array.isArray(payload.skillTags) ? payload.skillTags : [],
            aboutMe: sanitizedAboutMe,
            shareLinks: sanitizedShareLinks,
            adminTags: sanitizedAdminTags
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

    function renderAdminTags() {
        if (!customAdminTagsContainer) return;
        customAdminTagsContainer.innerHTML = "";

        if (!Array.isArray(adminTags) || adminTags.length === 0) {
            return;
        }

        const fragment = document.createDocumentFragment();

        adminTags.forEach((tag) => {
            const element = createAdminTagElement(tag);
            if (element) {
                fragment.appendChild(element);
            }
        });

        customAdminTagsContainer.appendChild(fragment);
    }

    function getRandomAdminTagColors(frontCandidate, backCandidate) {
        const frontCandidateTrimmed = typeof frontCandidate === 'string' ? frontCandidate.trim() : '';
        const backCandidateTrimmed = typeof backCandidate === 'string' ? backCandidate.trim() : '';

        const frontBg =
            frontCandidateTrimmed && frontCandidateTrimmed.toLowerCase() !== '#000000'
                ? frontCandidateTrimmed
                : ADMIN_TAG_FRONT_COLORS[Math.floor(Math.random() * ADMIN_TAG_FRONT_COLORS.length)];
        const backBg =
            backCandidateTrimmed && backCandidateTrimmed.toLowerCase() !== '#000000'
                ? backCandidateTrimmed
                : ADMIN_TAG_BACK_COLORS[Math.floor(Math.random() * ADMIN_TAG_BACK_COLORS.length)];

        return { frontBg, backBg };
    }

    function updateAdminTagColorDisplay(previewEl, valueEl, color, isRandom) {
        if (previewEl) {
            if (isRandom) {
                previewEl.style.background =
                    'repeating-linear-gradient(45deg, #f5f5f5 0 6px, #dcdcdc 6px 12px)';
                previewEl.style.backgroundColor = '';
            } else {
                previewEl.style.background = '';
                previewEl.style.backgroundColor = color;
            }
        }
        if (valueEl) {
            valueEl.textContent = isRandom ? '隨機' : color.toUpperCase();
        }
    }

    function createAdminTagElement(tag) {
        if (!tag || typeof tag !== 'object') return null;

        const parts =
            typeof tag.text === 'string'
                ? tag.text.split(',').map((part) => part.trim()).filter(Boolean)
                : [];

        if (parts.length !== 2) return null;

        const { frontBg, backBg } = getRandomAdminTagColors(tag.frontBg, tag.backBg);

        const wrapper = document.createElement('div');
        wrapper.className = 'custom-admin-tag';

        const frontSpan = document.createElement('span');
        frontSpan.className = 'custom-admin-tag__front';
        frontSpan.style.backgroundColor = frontBg;
        frontSpan.style.color = backBg;
        frontSpan.textContent = parts[0];

        const backSpan = document.createElement('span');
        backSpan.className = 'custom-admin-tag__back';
        backSpan.style.backgroundColor = backBg;
        backSpan.style.color = frontBg;
        backSpan.textContent = parts[1];

        wrapper.appendChild(frontSpan);
        wrapper.appendChild(backSpan);

        return wrapper;
    }

    function renderAdminTagList() {
        if (!adminTagList) return;

        adminTagList.innerHTML = '';

        if (!Array.isArray(adminTags) || adminTags.length === 0) {
            adminTagList.innerHTML = '<p class="admin-tags-empty">尚無自訂標籤</p>';
            return;
        }

        adminTags.forEach((tag, index) => {
            const item = document.createElement('div');
            item.className = 'admin-tags-item';

            const preview = createAdminTagElement(tag);
            if (preview) {
                item.appendChild(preview);
            }

            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'button';
            deleteBtn.className = 'admin-tags-delete';
            deleteBtn.dataset.index = String(index);
            deleteBtn.textContent = '刪除';
            item.appendChild(deleteBtn);

            adminTagList.appendChild(item);
        });

        adminTagList.querySelectorAll('.admin-tags-delete').forEach((button) => {
            button.addEventListener('click', () => {
                const index = Number(button.dataset.index);
                if (Number.isNaN(index)) return;
                adminTags.splice(index, 1);
                persistData();
                renderAdminTags();
                renderAdminTagList();
            });
        });
    }

    function resetAdminTagForm() {
        if (!adminTagForm) return;
        adminTagForm.reset();
        if (adminTagTextInput) {
            adminTagTextInput.value = "";
        }
        if (adminTagFrontBgInput) {
            adminTagFrontBgInput.value = ADMIN_TAG_FRONT_COLORS[0];
            adminTagFrontBgInput.dataset.random = "true";
        }
        updateAdminTagColorDisplay(
            adminTagFrontPreview,
            adminTagFrontValue,
            ADMIN_TAG_FRONT_COLORS[0],
            true
        );
        if (adminTagBackBgInput) {
            adminTagBackBgInput.value = ADMIN_TAG_BACK_COLORS[0];
            adminTagBackBgInput.dataset.random = "true";
        }
        updateAdminTagColorDisplay(
            adminTagBackPreview,
            adminTagBackValue,
            ADMIN_TAG_BACK_COLORS[0],
            true
        );
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

    function renderAboutMe() {
        renderLocation();
        renderExperiences();
        renderPositions();
        renderEducation();
        renderCertificates();
        renderWebsites();
    }

    function renderLocation() {
        if (!aboutLocationEl) return;
        aboutLocationEl.textContent = aboutMe.location || "未設定";
    }

    function renderExperiences() {
        if (!experienceListEl) return;
        experienceListEl.innerHTML = "";

        if (!aboutMe.experiences || aboutMe.experiences.length === 0) {
            experienceListEl.innerHTML = '<div style="margin-left: 1rem; color: rgba(28, 36, 49, 0.5);">暫無經歷</div>';
            return;
        }

        aboutMe.experiences.forEach((exp) => {
            const div = document.createElement("div");
            div.className = "experience-entry";

            const header = document.createElement("div");
            header.className = "experience-header";
            header.textContent = `• ${exp.company} | ${exp.years}`;

            const skillsDiv = document.createElement("div");
            skillsDiv.className = "experience-skills";

            exp.skills.forEach((skill) => {
                const skillTag = document.createElement("span");
                skillTag.className = "experience-skill-tag";
                skillTag.textContent = skill;
                skillTag.style.backgroundColor = "#c0c0c0";
                skillsDiv.appendChild(skillTag);
            });

            div.appendChild(header);
            if (exp.skills && exp.skills.length > 0) {
                div.appendChild(skillsDiv);
            }
            experienceListEl.appendChild(div);
        });
    }

    function renderPositions() {
        const positionListEl = document.getElementById("positionList");
        if (!positionListEl) return;
        positionListEl.innerHTML = "";

        if (!aboutMe.positions || aboutMe.positions.length === 0) {
            positionListEl.innerHTML = '<div style="color: rgba(28, 36, 49, 0.5);">暫無職務</div>';
            return;
        }

        aboutMe.positions.forEach((position) => {
            const span = document.createElement("span");
            span.className = "position-tag";
            span.textContent = position;
            span.style.backgroundColor = "#c0c0c0";
            positionListEl.appendChild(span);
        });
    }

    function renderEducation() {
        if (!educationListEl) return;
        educationListEl.innerHTML = "";

        if (!aboutMe.education || aboutMe.education.length === 0) {
            educationListEl.innerHTML = '<div style="color: rgba(28, 36, 49, 0.5);">暫無學歷</div>';
            return;
        }

        aboutMe.education.forEach((edu) => {
            const span = document.createElement("span");
            span.className = "education-tag";
            span.textContent = `${edu.school} ${edu.degree}`;
            span.style.backgroundColor = "#c0c0c0";
            educationListEl.appendChild(span);
        });
    }

    function renderCertificates() {
        if (!certificateListEl) return;
        certificateListEl.innerHTML = "";

        if (!aboutMe.certificates || aboutMe.certificates.length === 0) {
            certificateListEl.innerHTML = '<div style="color: rgba(28, 36, 49, 0.5);">暫無證書</div>';
            return;
        }

        aboutMe.certificates.forEach((cert) => {
            const div = document.createElement("div");
            div.className = "certificate-item";
            div.dataset.certId = cert.id;

            const img = document.createElement("img");
            img.className = "certificate-thumbnail";
            img.src = cert.imageUrl || "assets/photos/default.jpg";
            img.alt = cert.title;

            const title = document.createElement("div");
            title.className = "certificate-title";
            title.textContent = cert.title;

            div.appendChild(img);
            div.appendChild(title);
            certificateListEl.appendChild(div);

            // 點擊預覽
            div.addEventListener("click", () => {
                if (imagePreviewImg && imagePreviewTitle && imagePreviewModal) {
                    imagePreviewImg.src = cert.imageUrl || "assets/photos/default.jpg";
                    imagePreviewTitle.textContent = cert.description || cert.title;
                    openDialog(imagePreviewModal);
                }
            });
        });
    }

    function renderWebsites() {
        if (!websiteListEl) return;
        websiteListEl.innerHTML = "";

        if (!aboutMe.websites || aboutMe.websites.length === 0) {
            websiteListEl.innerHTML = '<div style="color: rgba(28, 36, 49, 0.5);">暫無網站連結</div>';
            return;
        }

        aboutMe.websites.forEach((web) => {
            const div = document.createElement("div");
            div.className = "website-item";

            // 顯示圖示（有指定就用指定的，沒有就用 web.png）
            const icon = document.createElement("img");
            icon.className = "website-icon";
            icon.src = web.icon || "assets/photos/web.png";
            icon.alt = web.label;
            div.appendChild(icon);

            const label = document.createElement("strong");
            label.style.color = "#4a4a4a";
            label.textContent = web.label;

            const colon = document.createTextNode(": ");

            const link = document.createElement("a");
            link.href = web.url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.style.color = "#808080";
            link.textContent = web.url;

            div.appendChild(label);
            div.appendChild(colon);
            div.appendChild(link);

            websiteListEl.appendChild(div);
        });
    }

    // ===== 分享連結渲染 =====
    function renderShareLinks() {
        if (!shareLinksGrid) return;
        shareLinksGrid.innerHTML = "";

        if (!shareLinks || shareLinks.length === 0) {
            return; // 沒有分享連結時不顯示任何內容
        }

        const totalCount = shareLinks.length;

        // 根據螢幕寬度決定每行幾個
        const screenWidth = window.innerWidth;
        let columnsPerRow = 5; // 預設5個
        if (screenWidth <= 400) columnsPerRow = 3;
        else if (screenWidth <= 500) columnsPerRow = 3;
        else if (screenWidth <= 600) columnsPerRow = 4;

        const gap = 16; // 1rem = 16px
        const cardWidth = (shareLinksGrid.offsetWidth - gap * (columnsPerRow - 1)) / columnsPerRow;

        // 計算卡片分配
        const totalRows = Math.ceil(totalCount / columnsPerRow);
        const enableWaterfall = totalRows > 5;
        const regularRowsCount = enableWaterfall ? 5 : totalRows; // 前面整齊排列的行數
        const regularCardsCount = regularRowsCount * columnsPerRow; // 前面整齊排列的卡片數

        // 每一列的高度陣列（單位：卡片數量）
        const columnHeights = new Array(columnsPerRow).fill(regularRowsCount);

        // 卡片位置映射表：cardIndex -> { col, row }
        const cardPositions = [];

        // 1. 前面的整齊區域
        for (let i = 0; i < Math.min(regularCardsCount, totalCount); i++) {
            const row = Math.floor(i / columnsPerRow);
            const col = i % columnsPerRow;
            cardPositions.push({ col, row });
        }

        // 2. 如果啟用水流效果，分配剩餘的卡片
        if (enableWaterfall && totalCount > regularCardsCount) {
            const remainingCards = totalCount - regularCardsCount;

            // 計算每一列應該多放幾個卡片
            // 先隨機決定每一列要缺 0-5 個（從底部開始缺）
            const missingCardsPerColumn = [];
            for (let col = 0; col < columnsPerRow; col++) {
                const missing = Math.floor(Math.random() * 6); // 0-5
                missingCardsPerColumn.push(missing);
            }

            // 計算每一列實際要放幾個卡片
            const extraCardsPerColumn = [];
            let totalAssigned = 0;

            for (let col = 0; col < columnsPerRow; col++) {
                const maxExtra = 5; // 每一列最多多放5個
                const extra = Math.max(0, maxExtra - missingCardsPerColumn[col]);
                extraCardsPerColumn.push(extra);
                totalAssigned += extra;
            }

            // 如果分配的位置不夠，需要調整
            if (totalAssigned < remainingCards) {
                const deficit = remainingCards - totalAssigned;
                // 將不足的部分平均分配到各列
                for (let i = 0; i < deficit; i++) {
                    const col = i % columnsPerRow;
                    extraCardsPerColumn[col]++;
                }
            }

            // 如果分配的位置太多，需要削減（從缺塊最少的列開始削減）
            if (totalAssigned > remainingCards) {
                const excess = totalAssigned - remainingCards;
                // 將多餘的位置從各列削減
                for (let i = 0; i < excess; i++) {
                    // 找出當前分配最多的列
                    let maxCol = 0;
                    for (let col = 1; col < columnsPerRow; col++) {
                        if (extraCardsPerColumn[col] > extraCardsPerColumn[maxCol]) {
                            maxCol = col;
                        }
                    }
                    extraCardsPerColumn[maxCol] = Math.max(0, extraCardsPerColumn[maxCol] - 1);
                }
            }

            // 更新列高度
            for (let col = 0; col < columnsPerRow; col++) {
                columnHeights[col] += extraCardsPerColumn[col];
            }

            // 將剩餘卡片按列分配
            let cardIndex = regularCardsCount;
            for (let col = 0; col < columnsPerRow; col++) {
                const extraCount = extraCardsPerColumn[col];
                for (let i = 0; i < extraCount; i++) {
                    const row = regularRowsCount + i;
                    cardPositions.push({ col, row });
                    cardIndex++;
                }
            }
        }

        // 計算容器總高度
        const maxHeight = Math.max(...columnHeights);
        const containerHeight = maxHeight * cardWidth + (maxHeight - 1) * gap;
        shareLinksGrid.style.height = `${containerHeight}px`;

        // 計算漸層顏色的函數
        function getGradientColor(row, maxRow) {
            // 起始色: #4a4a4a (深灰)
            const startR = 0x4a, startG = 0x4a, startB = 0x4a;
            // 結束色: #c0c0c0 (淺灰)
            const endR = 0xc0, endG = 0xc0, endB = 0xc0;

            // 計算比例 (0 = 最上面, 1 = 最下面)
            const ratio = maxRow > 0 ? row / maxRow : 0;

            // 線性插值
            const r = Math.round(startR + (endR - startR) * ratio);
            const g = Math.round(startG + (endG - startG) * ratio);
            const b = Math.round(startB + (endB - startB) * ratio);

            return `rgb(${r}, ${g}, ${b})`;
        }

        // 渲染所有卡片
        shareLinks.forEach((link, index) => {
            const card = document.createElement("div");
            card.className = "share-link-card";

            // 獲取這張卡片的位置
            const pos = cardPositions[index];
            if (!pos) return;

            // 根據行數設定漸層顏色
            card.style.backgroundColor = getGradientColor(pos.row, maxHeight - 1);

            // 設定卡片位置和尺寸
            card.style.width = `${cardWidth}px`;
            card.style.left = `${pos.col * (cardWidth + gap)}px`;
            card.style.top = `${pos.row * (cardWidth + gap)}px`;

            // 判斷是否為水流區域的卡片（第6行以後）
            const isWaterfallCard = pos.row >= regularRowsCount;

            if (isWaterfallCard) {
                // 添加水流效果類別
                card.classList.add("share-link-card--waterfall");

                // 隨機動畫延遲（0-1秒）
                const randomDelay = Math.random() * 1;
                card.style.animationDelay = `${randomDelay}s`;

                // 隨機的輕微垂直偏移（製造更自然的水流感）
                const randomOffset = (Math.random() - 0.5) * 10; // -5px 到 +5px
                card.style.transform = `translateY(${randomOffset}px)`;
            }

            // 如果沒有 URL，改變游標樣式
            if (!link.url || !link.url.trim()) {
                card.style.cursor = "default";
            }

            const text = document.createElement("div");
            text.className = "share-link-text";
            text.textContent = generateAbbreviation(link.name);

            const tooltip = document.createElement("div");
            tooltip.className = "share-link-tooltip";

            // 建立兩行結構：名稱 + 說明
            const tooltipName = document.createElement("div");
            tooltipName.className = "share-link-tooltip__name";
            tooltipName.textContent = link.name;

            if (link.description && link.description.trim()) {
                const tooltipDesc = document.createElement("div");
                tooltipDesc.className = "share-link-tooltip__desc";
                tooltipDesc.textContent = link.description;
                tooltip.appendChild(tooltipName);
                tooltip.appendChild(tooltipDesc);
            } else {
                // 如果沒有說明，只顯示名稱
                tooltip.appendChild(tooltipName);
            }

            card.appendChild(text);
            card.appendChild(tooltip);

            // Hover 時調整 tooltip 位置，避免超出螢幕
            card.addEventListener("mouseenter", () => {
                setTimeout(() => {
                    const rect = card.getBoundingClientRect();
                    const tooltipRect = tooltip.getBoundingClientRect();
                    const cardCenter = rect.left + rect.width / 2;

                    // 檢查是否超出左邊
                    if (rect.left < tooltipRect.width / 2) {
                        tooltip.style.left = "0";
                        tooltip.style.right = "auto";
                        tooltip.style.transform = "translateX(0) translateY(0)";
                        const arrowOffset = cardCenter - rect.left;
                        tooltip.style.setProperty('--arrow-left', `${arrowOffset}px`);
                    }
                    // 檢查是否超出右邊
                    else if (rect.right + tooltipRect.width / 2 > window.innerWidth) {
                        tooltip.style.left = "auto";
                        tooltip.style.right = "0";
                        tooltip.style.transform = "translateX(0) translateY(0)";
                        const arrowOffset = rect.right - cardCenter;
                        tooltip.style.setProperty('--arrow-left', `calc(100% - ${arrowOffset}px)`);
                    }
                    // 正常居中
                    else {
                        tooltip.style.left = "50%";
                        tooltip.style.right = "auto";
                        tooltip.style.transform = "translateX(-50%) translateY(0)";
                        tooltip.style.setProperty('--arrow-left', '50%');
                    }
                }, 10);
            });

            // 點擊開新視窗（如果有URL）
            card.addEventListener("click", () => {
                if (link.url && link.url.trim()) {
                    window.open(link.url, "_blank", "noopener,noreferrer");
                }
            });

            shareLinksGrid.appendChild(card);
        });

        // 調整分享連結位置（需要在 DOM 渲染完成後執行）
        setTimeout(() => handleShareLinksPosition(), 0);
    }

    // 生成圖標文字（英文取首尾，中文取首字）
    function generateAbbreviation(name) {
        if (!name) return "";

        const trimmed = name.trim();
        // 判斷是否包含中文
        const hasChinese = /[\u4e00-\u9fa5]/.test(trimmed);

        if (hasChinese) {
            // 中文：取第一個字
            return trimmed.charAt(0);
        } else {
            // 英文：取第一個和最後一個字母
            if (trimmed.length === 1) return trimmed.toUpperCase();
            return (trimmed.charAt(0) + trimmed.charAt(trimmed.length - 1)).toUpperCase();
        }
    }

    // 生成隨機明亮的背景色（HSL）
    function generateRandomColor() {
        const hue = Math.floor(Math.random() * 360);
        const saturation = 60 + Math.floor(Math.random() * 20); // 60-80%
        const lightness = 50 + Math.floor(Math.random() * 15);  // 50-65%
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
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
        if (editAdminTagsBtn) editAdminTagsBtn.hidden = !isAdmin;
        if (editProfileBtn) editProfileBtn.hidden = !isAdmin;
        if (editSkillTagsBtn) editSkillTagsBtn.hidden = !isAdmin;
        if (editAboutMeBtn) editAboutMeBtn.hidden = !isAdmin;
        if (editShareLinksBtn) editShareLinksBtn.hidden = !isAdmin;
        renderProfile();
        renderAdminTags();
        renderAboutMe();
        renderSkillTags();
        renderShareLinks();
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

    editAdminTagsBtn?.addEventListener("click", () => {
        if (!isAdmin) return;
        resetAdminTagForm();
        renderAdminTagList();
        openDialog(adminTagModal);
        adminTagTextInput?.focus();
    });

    closeAdminTagModalBtn?.addEventListener("click", () => {
        resetAdminTagForm();
        closeDialog(adminTagModal);
    });

    cancelAdminTagBtn?.addEventListener("click", () => {
        resetAdminTagForm();
        closeDialog(adminTagModal);
    });

    adminTagFrontBgInput?.addEventListener("input", () => {
        adminTagFrontBgInput.dataset.random = "false";
        updateAdminTagColorDisplay(adminTagFrontPreview, adminTagFrontValue, adminTagFrontBgInput.value, false);
    });

    adminTagBackBgInput?.addEventListener("input", () => {
        adminTagBackBgInput.dataset.random = "false";
        updateAdminTagColorDisplay(adminTagBackPreview, adminTagBackValue, adminTagBackBgInput.value, false);
    });

    adminTagFrontRandomBtn?.addEventListener("click", () => {
        if (!adminTagFrontBgInput) return;
        adminTagFrontBgInput.dataset.random = "true";
        adminTagFrontBgInput.value = ADMIN_TAG_FRONT_COLORS[0];
        updateAdminTagColorDisplay(adminTagFrontPreview, adminTagFrontValue, ADMIN_TAG_FRONT_COLORS[0], true);
    });

    adminTagBackRandomBtn?.addEventListener("click", () => {
        if (!adminTagBackBgInput) return;
        adminTagBackBgInput.dataset.random = "true";
        adminTagBackBgInput.value = ADMIN_TAG_BACK_COLORS[0];
        updateAdminTagColorDisplay(adminTagBackPreview, adminTagBackValue, ADMIN_TAG_BACK_COLORS[0], true);
    });

    adminTagForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!isAdmin) return;

        const rawText = adminTagTextInput?.value ?? "";
        const parts = rawText
            .split(",")
            .map((part) => part.trim())
            .filter(Boolean);

        if (parts.length !== 2) {
            alert("請輸入「前段,後段」格式的標籤文字。");
            return;
        }

        const frontCustom =
            adminTagFrontBgInput && adminTagFrontBgInput.dataset.random === "false"
                ? adminTagFrontBgInput.value
                : "";
        const backCustom =
            adminTagBackBgInput && adminTagBackBgInput.dataset.random === "false"
                ? adminTagBackBgInput.value
                : "";

        const { frontBg, backBg } = getRandomAdminTagColors(frontCustom, backCustom);

        adminTags.push({
            text: `${parts[0]},${parts[1]}`,
            frontBg,
            backBg
        });

        persistData();
        renderAdminTags();
        renderAdminTagList();
        resetAdminTagForm();
        adminTagTextInput?.focus();
    });

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
        const rawImageUrl = fieldImageUrl.value.trim();
        const imageUrl = rawImageUrl ? convertGoogleDriveUrl(rawImageUrl) : "";

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
        const rawAvatarUrl = profileAvatarInput.value.trim();
        profile = {
            name: profileNameInput.value.trim() || DEFAULT_PROFILE.name,
            email: profileEmailInput.value.trim() || DEFAULT_PROFILE.email,
            summary: profileSummaryInput.value.trim() || DEFAULT_PROFILE.summary,
            avatar: rawAvatarUrl ? convertGoogleDriveUrl(rawAvatarUrl) : DEFAULT_PROFILE.avatar
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

    // 回到頂部按鈕功能
    const skillDetailContent = document.querySelector(".modal__content--skill-detail");

    // 監聽技能詳情 Modal 的滾動
    skillDetailContent?.addEventListener("scroll", () => {
        if (!scrollToTopBtn) return;

        // 當滾動超過 300px 時顯示按鈕
        if (skillDetailContent.scrollTop > 300) {
            scrollToTopBtn.classList.add("visible");
        } else {
            scrollToTopBtn.classList.remove("visible");
        }
    });

    // 點擊回到頂部按鈕
    scrollToTopBtn?.addEventListener("click", () => {
        if (!skillDetailContent || !projectNavigationList) return;

        // 平滑滾動到專案列表（導航列表位置）
        projectNavigationList.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });
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

    addSkillTagBtn?.addEventListener("click", async () => {
        const newTag = newSkillTagInput?.value.trim();
        if (!newTag) return;

        if (skillTags.includes(newTag)) {
            alert("此標籤已存在！");
            return;
        }

        skillTags.push(newTag);

        // 先更新 UI
        renderSkillTags();
        renderSkillTagsManager();
        newSkillTagInput.value = "";
        newSkillTagInput.focus();

        // 等待 Firebase 同步完成
        await syncFirestoreData({ profile, skills, skillTags, aboutMe, shareLinks });
    });

    newSkillTagInput?.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addSkillTagBtn?.click();
        }
    });

    skillTagsList?.addEventListener("click", async (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;

        const removeBtn = target.closest(".skill-tag-remove");
        if (!removeBtn) return;

        const tagText = removeBtn.dataset.tag;
        if (!tagText) return;

        if (!window.confirm(`確定要刪除標籤「${tagText}」嗎？`)) return;

        skillTags = skillTags.filter(tag => tag !== tagText);

        // 先更新 UI（顯示刪除中）
        renderSkillTags();
        renderSkillTagsManager();

        // 等待 Firebase 同步完成
        await syncFirestoreData({ profile, skills, skillTags, aboutMe, shareLinks });
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
        if (!detailSkillTitle || !detailProjectContainer || !detailSkillIntro || !projectNavigationList) return;
        detailSkillTitle.textContent = skill.title;
        detailSkillIntro.innerHTML = `<p>${escapeHTML(skill.description || "")}</p>`;

        if (!skill.projects || !skill.projects.length) {
            projectNavigationList.innerHTML = "";
            projectNavigationList.style.display = "none";
            detailProjectContainer.innerHTML = `<div class="project-empty">No projects have been added for this skill yet.</div>`;
            return;
        }

        // 渲染專案導航列表
        projectNavigationList.style.display = "flex";
        projectNavigationList.innerHTML = skill.projects
            .map(project => `
                <button
                    type="button"
                    class="project-nav-item"
                    data-project-id="${project.id}"
                    data-project-name="${escapeAttribute(project.name)}"
                >
                    ${escapeHTML(project.name)}
                </button>
            `)
            .join("");

        // 為導航按鈕添加點擊事件
        projectNavigationList.querySelectorAll(".project-nav-item").forEach(navItem => {
            navItem.addEventListener("click", () => {
                const projectId = navItem.dataset.projectId;
                const targetProject = detailProjectContainer.querySelector(`[data-project-id="${projectId}"]`);

                if (targetProject) {
                    // 平滑滾動到目標專案
                    targetProject.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                        inline: "nearest"
                    });

                    // 添加高亮效果
                    targetProject.style.transition = "all 0.3s ease";
                    targetProject.style.boxShadow = "0 0 0 3px rgba(12, 124, 213, 0.3), 0 8px 24px rgba(0, 0, 0, 0.1)";

                    setTimeout(() => {
                        targetProject.style.boxShadow = "";
                    }, 2000);
                }
            });
        });

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

    // 轉換 Google Drive 分享連結為直接檢視連結（用於圖片）
    function convertGoogleDriveUrl(url) {
        // 匹配 Google Drive 分享連結格式
        const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
        if (driveMatch && driveMatch[1]) {
            // 使用 thumbnail 格式，更穩定且支援較大圖片
            return `https://drive.google.com/thumbnail?id=${driveMatch[1]}&sz=w1000`;
        }
        return url;
    }

    // 轉換 Google Drive 分享連結為直接下載連結（用於檔案）
    function convertGoogleDriveDownloadUrl(url) {
        // 匹配 Google Drive 分享連結格式
        const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
        if (driveMatch && driveMatch[1]) {
            // 使用 uc?export=download&confirm=t 格式，嘗試繞過病毒掃描警告
            return `https://drive.google.com/uc?export=download&confirm=t&id=${driveMatch[1]}`;
        }
        return url;
    }

    // 轉換 YouTube 連結為嵌入格式
    function convertYouTubeUrl(url) {
        // 匹配標準 YouTube 連結: https://www.youtube.com/watch?v=VIDEO_ID
        let match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
        if (match && match[1]) {
            return match[1];
        }
        // 匹配已經是 embed 格式的連結
        match = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    }

    function renderProjectMedia(media) {
        const label = media.label ? `<div class="project-media-label">${escapeHTML(media.label)}</div>` : "";

        // 檢查是否為 YouTube 連結
        const youtubeId = convertYouTubeUrl(media.url);
        if (youtubeId) {
            return `
                <div class="project-media-card project-media-card--video">
                    ${label}
                    <div class="video-wrapper">
                        <iframe
                            src="https://www.youtube.com/embed/${youtubeId}"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>
            `;
        }

        // 檢查是否為檔案類型
        if (media.type === "file") {
            // 自動轉換 Google Drive 檔案連結為直接下載連結
            const fileUrl = convertGoogleDriveDownloadUrl(media.url);
            return `
                <div class="project-media-card project-media-card--file">
                    ${label}
                    <a href="${escapeAttribute(fileUrl)}" target="_blank" rel="noopener noreferrer" data-media-type="file"><img src="assets/photos/file.svg" alt="file icon" class="file-icon">${escapeHTML(media.label || media.url)}</a>
                </div>
            `;
        }

        // 圖片類型 - 自動轉換 Google Drive 連結
        const imageUrl = convertGoogleDriveUrl(media.url);
        return `
            <div class="project-media-card">
                <img
                    src="${escapeAttribute(imageUrl)}"
                    alt="${escapeHTML(media.label || media.url)}"
                    data-media-type="image"
                    data-media-url="${escapeAttribute(imageUrl)}"
                    data-media-label="${escapeHTML(media.label || '')}"
                    onerror="this.onerror=null; if(this.src.includes('thumbnail')) { this.src=this.src.replace('thumbnail?id=', 'uc?export=view&id=').replace('&sz=w1000', ''); }"
                >
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

    // ===== 關於我管理功能 =====
    editAboutMeBtn?.addEventListener("click", () => {
        if (!isAdmin) return;
        // 填入現有資料
        if (aboutLocationInput) aboutLocationInput.value = aboutMe.location || "";
        renderAboutMeManager();
        openDialog(aboutMeModal);
    });

    closeAboutMeBtn?.addEventListener("click", () => {
        closeDialog(aboutMeModal);
    });

    saveAboutMeBtn?.addEventListener("click", () => {
        // 收集資料
        aboutMe.location = aboutLocationInput?.value.trim() || "";
        aboutMe.experiences = collectExperiences();
        aboutMe.positions = collectPositions();
        aboutMe.education = collectEducation();
        aboutMe.certificates = collectCertificates();
        aboutMe.websites = collectWebsites();

        persistData();
        renderAboutMe();
        closeDialog(aboutMeModal);
    });

    function renderAboutMeManager() {
        renderExperienceManager();
        renderPositionManager();
        renderEducationManager();
        renderCertificateManager();
        renderWebsiteManager();
    }

    // 經歷管理
    addExperienceBtn?.addEventListener("click", () => {
        addExperienceItem();
    });

    function renderExperienceManager() {
        if (!experienceManagerList) return;
        experienceManagerList.innerHTML = "";
        aboutMe.experiences.forEach((exp) => addExperienceItem(exp));
    }

    function addExperienceItem(data = null) {
        if (!experienceManagerList) return;
        const div = document.createElement("div");
        div.className = "manager-item";
        div.dataset.expId = data?.id || generateId("exp");

        div.innerHTML = `
            <div class="manager-item__fields">
                <input type="text" placeholder="公司名稱" value="${escapeHTML(data?.company || '')}" data-field="company" />
                <input type="text" placeholder="年資 (例: 3年)" value="${escapeHTML(data?.years || '')}" data-field="years" />
                <input type="text" placeholder="技能 (逗號分隔)" value="${data?.skills ? data.skills.join(', ') : ''}" data-field="skills" />
            </div>
            <button type="button" class="manager-item__remove">×</button>
        `;

        div.querySelector(".manager-item__remove")?.addEventListener("click", () => div.remove());
        experienceManagerList.appendChild(div);
    }

    function collectExperiences() {
        if (!experienceManagerList) return [];
        const items = experienceManagerList.querySelectorAll(".manager-item");
        return Array.from(items).map(item => ({
            id: item.dataset.expId || generateId("exp"),
            company: item.querySelector('[data-field="company"]')?.value.trim() || "",
            years: item.querySelector('[data-field="years"]')?.value.trim() || "",
            skills: item.querySelector('[data-field="skills"]')?.value.split(',').map(s => s.trim()).filter(Boolean) || []
        })).filter(exp => exp.company);
    }

    // 職務管理
    function renderPositionManager() {
        if (!positionManagerList) return;
        const input = document.createElement("input");
        input.type = "text";
        input.id = "positionInput";
        input.placeholder = "職務名稱（使用逗號分隔，例如：DevOps, 雲端架構師, 伺服器管理員）";
        input.value = aboutMe.positions.join(", ");
        positionManagerList.innerHTML = "";
        positionManagerList.appendChild(input);
    }

    function collectPositions() {
        const input = document.getElementById("positionInput");
        if (!input) return [];
        return input.value
            .split(",")
            .map(p => p.trim())
            .filter(p => p);
    }

    // 學歷管理
    addEducationBtn?.addEventListener("click", () => {
        addEducationItem();
    });

    function renderEducationManager() {
        if (!educationManagerList) return;
        educationManagerList.innerHTML = "";
        aboutMe.education.forEach((edu) => addEducationItem(edu));
    }

    function addEducationItem(data = null) {
        if (!educationManagerList) return;
        const div = document.createElement("div");
        div.className = "manager-item";
        div.dataset.eduId = data?.id || generateId("edu");

        div.innerHTML = `
            <div class="manager-item__fields">
                <input type="text" placeholder="學校名稱" value="${escapeHTML(data?.school || '')}" data-field="school" />
                <input type="text" placeholder="學位/科系" value="${escapeHTML(data?.degree || '')}" data-field="degree" />
            </div>
            <button type="button" class="manager-item__remove">×</button>
        `;

        div.querySelector(".manager-item__remove")?.addEventListener("click", () => div.remove());
        educationManagerList.appendChild(div);
    }

    function collectEducation() {
        if (!educationManagerList) return [];
        const items = educationManagerList.querySelectorAll(".manager-item");
        return Array.from(items).map(item => ({
            id: item.dataset.eduId || generateId("edu"),
            school: item.querySelector('[data-field="school"]')?.value.trim() || "",
            degree: item.querySelector('[data-field="degree"]')?.value.trim() || ""
        })).filter(edu => edu.school);
    }

    // 證書管理
    addCertificateBtn?.addEventListener("click", () => {
        addCertificateItem();
    });

    function renderCertificateManager() {
        if (!certificateManagerList) return;
        certificateManagerList.innerHTML = "";
        aboutMe.certificates.forEach((cert) => addCertificateItem(cert));
    }

    function addCertificateItem(data = null) {
        if (!certificateManagerList) return;
        const div = document.createElement("div");
        div.className = "manager-item";
        div.dataset.certId = data?.id || generateId("cert");

        div.innerHTML = `
            <div class="manager-item__fields">
                <input type="text" placeholder="證書名稱" value="${escapeHTML(data?.title || '')}" data-field="title" />
                <input type="text" placeholder="圖片網址" value="${escapeHTML(data?.imageUrl || '')}" data-field="imageUrl" />
                <input type="text" placeholder="說明" value="${escapeHTML(data?.description || '')}" data-field="description" />
            </div>
            <button type="button" class="manager-item__remove">×</button>
        `;

        div.querySelector(".manager-item__remove")?.addEventListener("click", () => div.remove());
        certificateManagerList.appendChild(div);
    }

    function collectCertificates() {
        if (!certificateManagerList) return [];
        const items = certificateManagerList.querySelectorAll(".manager-item");
        return Array.from(items).map(item => {
            const rawImageUrl = item.querySelector('[data-field="imageUrl"]')?.value.trim() || "";
            return {
                id: item.dataset.certId || generateId("cert"),
                title: item.querySelector('[data-field="title"]')?.value.trim() || "",
                imageUrl: rawImageUrl ? convertGoogleDriveUrl(rawImageUrl) : "",
                description: item.querySelector('[data-field="description"]')?.value.trim() || ""
            };
        }).filter(cert => cert.title);
    }

    // 網站管理
    addWebsiteBtn?.addEventListener("click", () => {
        addWebsiteItem();
    });

    function renderWebsiteManager() {
        if (!websiteManagerList) return;
        websiteManagerList.innerHTML = "";
        aboutMe.websites.forEach((web) => addWebsiteItem(web));
    }

    function addWebsiteItem(data = null) {
        if (!websiteManagerList) return;
        const div = document.createElement("div");
        div.className = "manager-item";
        div.dataset.webId = data?.id || generateId("web");

        div.innerHTML = `
            <div class="manager-item__fields">
                <input type="text" placeholder="網站名稱 (例: GitHub)" value="${escapeHTML(data?.label || '')}" data-field="label" />
                <input type="text" placeholder="網址" value="${escapeHTML(data?.url || '')}" data-field="url" />
                <input type="text" placeholder="圖示網址 (選填)" value="${escapeHTML(data?.icon || '')}" data-field="icon" />
            </div>
            <button type="button" class="manager-item__remove">×</button>
        `;

        div.querySelector(".manager-item__remove")?.addEventListener("click", () => div.remove());
        websiteManagerList.appendChild(div);
    }

    function collectWebsites() {
        if (!websiteManagerList) return [];
        const items = websiteManagerList.querySelectorAll(".manager-item");
        return Array.from(items).map(item => ({
            id: item.dataset.webId || generateId("web"),
            label: item.querySelector('[data-field="label"]')?.value.trim() || "",
            url: item.querySelector('[data-field="url"]')?.value.trim() || "",
            icon: item.querySelector('[data-field="icon"]')?.value.trim() || ""
        })).filter(web => web.label && web.url);
    }

    // ===== 分享連結管理功能 =====
    editShareLinksBtn?.addEventListener("click", () => {
        if (!isAdmin) return;
        renderShareLinksManager();
        openDialog(shareLinksModal);
    });

    closeShareLinksBtn?.addEventListener("click", () => {
        closeDialog(shareLinksModal);
    });

    saveShareLinksBtn?.addEventListener("click", () => {
        shareLinks = collectShareLinks();
        persistData();
        renderShareLinks();
        closeDialog(shareLinksModal);
    });

    addShareLinkBtn?.addEventListener("click", () => {
        addShareLinkItem();
    });

    function renderShareLinksManager() {
        if (!shareLinksManagerList) return;
        shareLinksManagerList.innerHTML = "";
        shareLinks.forEach((link) => addShareLinkItem(link));
    }

    function addShareLinkItem(data = null) {
        if (!shareLinksManagerList) return;
        const div = document.createElement("div");
        div.className = "share-link-manager-item";
        div.dataset.linkId = data?.id || generateId("share");

        div.innerHTML = `
            <div class="share-link-manager-item__fields">
                <input type="text" placeholder="分享名稱（例如：GitHub 或 個人部落格）" value="${escapeHTML(data?.name || '')}" data-field="name" />
                <input type="text" placeholder="說明（hover時顯示）" value="${escapeHTML(data?.description || '')}" data-field="description" />
                <input type="text" placeholder="連結網址" value="${escapeHTML(data?.url || '')}" data-field="url" />
            </div>
            <button type="button" class="share-link-manager-item__remove">×</button>
        `;

        div.querySelector(".share-link-manager-item__remove")?.addEventListener("click", () => div.remove());
        shareLinksManagerList.appendChild(div);
    }

    function collectShareLinks() {
        if (!shareLinksManagerList) return [];
        const items = shareLinksManagerList.querySelectorAll(".share-link-manager-item");

        return Array.from(items).map(item => ({
            id: item.dataset.linkId || generateId("share"),
            name: item.querySelector('[data-field="name"]')?.value.trim() || "",
            description: item.querySelector('[data-field="description"]')?.value.trim() || "",
            url: item.querySelector('[data-field="url"]')?.value.trim() || ""
        })).filter(link => link.name); // 只要有名稱就保留
    }

    // ===== 響應式支援 =====
    let resizeTimer;

    // 處理分享連結在不同螢幕尺寸的位置
    function handleShareLinksPosition() {
        const shareLinksSection = document.querySelector('.share-links-section');
        const heroContent = document.querySelector('.hero__content');
        const body = document.body;

        if (!shareLinksSection || !heroContent) return;

        const screenWidth = window.innerWidth;

        // 1024px 以下（平板/手機）：移到 body 最後（整個頁面最下方）
        if (screenWidth <= 1024) {
            if (shareLinksSection.parentNode) {
                body.appendChild(shareLinksSection);
            }
        } else {
            // 桌面版：保持在 hero__content 內
            if (shareLinksSection.parentNode !== heroContent) {
                heroContent.appendChild(shareLinksSection);
            }
        }
    }

    // 初始執行一次
    handleShareLinksPosition();

    window.addEventListener("resize", () => {
        // 防抖動：等待調整完成後才重新渲染
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            handleShareLinksPosition();
            renderShareLinks();
        }, 200);
    });

    // ===== 留言功能 =====
    // 開啟留言 Modal
    openMessageModalBtn?.addEventListener("click", () => {
        messageModal?.showModal();
    });

    // 關閉留言 Modal
    closeMessageBtn?.addEventListener("click", () => {
        closeDialog(messageModal);
        resetMessageForm();
    });

    cancelMessageBtn?.addEventListener("click", () => {
        closeDialog(messageModal);
        resetMessageForm();
    });

    // 重置表單
    function resetMessageForm() {
        messageForm?.reset();
        if (messageStatusEl) {
            messageStatusEl.textContent = "";
            messageStatusEl.className = "message-status";
        }
        // 重置 reCAPTCHA
        if (typeof grecaptcha !== "undefined") {
            grecaptcha.reset();
        }
    }

    // 送出留言
    messageForm?.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nameInput = document.getElementById("messageName");
        const emailInput = document.getElementById("messageEmail");
        const contentInput = document.getElementById("messageContent");
        const sendBtn = document.getElementById("sendMessage");

        if (!nameInput || !emailInput || !contentInput) return;

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = contentInput.value.trim();

        if (!name || !email || !message) {
            showMessageStatus("請填寫所有欄位", "error");
            return;
        }

        // 驗證 reCAPTCHA
        let recaptchaResponse = "";
        if (typeof grecaptcha !== "undefined") {
            recaptchaResponse = grecaptcha.getResponse();
            if (!recaptchaResponse) {
                showMessageStatus("請完成 reCAPTCHA 驗證", "error");
                return;
            }
        }

        // 顯示發送中狀態
        showMessageStatus("正在發送留言...", "sending");
        if (sendBtn) sendBtn.disabled = true;

        try {
            // 使用 EmailJS 發送郵件（包含 reCAPTCHA token）
            const response = await emailjs.send(
                "service_1xmtsnl", // Service ID
                "template_niim05w", // Template ID
                {
                    from_name: name,
                    reply_to: email,
                    message: message,
                    "g-recaptcha-response": recaptchaResponse
                }
            );

            if (response.status === 200) {
                showMessageStatus("留言已成功發送！感謝您的留言。", "success");
                setTimeout(() => {
                    closeDialog(messageModal);
                    resetMessageForm();
                }, 2000);
            } else {
                throw new Error("發送失敗");
            }
        } catch (error) {
            console.error("EmailJS 發送錯誤:", error);
            showMessageStatus("發送失敗，請稍後再試。", "error");
            // 發送失敗時重置 reCAPTCHA
            if (typeof grecaptcha !== "undefined") {
                grecaptcha.reset();
            }
        } finally {
            if (sendBtn) sendBtn.disabled = false;
        }
    });

    // 顯示訊息狀態
    function showMessageStatus(message, type) {
        if (!messageStatusEl) return;
        messageStatusEl.textContent = message;
        messageStatusEl.className = `message-status ${type}`;
    }
})();
