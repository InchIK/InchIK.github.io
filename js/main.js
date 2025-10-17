(() => {
    const STORAGE_KEY = "resumeSkills";
    const PROFILE_KEY = "resumeProfile";
    const SESSION_KEY = "resumeAdmin";
    const ADMIN_EMAIL = "kungyc@gmail.com"; // Admin's email

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

    let profile = loadProfile();
    let skills = loadSkills();
    let isAdmin = sessionStorage.getItem(SESSION_KEY) === "true";

    renderProfile();
    renderSkills();
    syncAdminUI();

    // Firebase auth tools
    const { auth, provider, signInWithPopup, onAuthStateChanged, signOut } = window.firebaseTools;

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

    function loadProfile() {
        const saved = localStorage.getItem(PROFILE_KEY);
        if (!saved) return { ...DEFAULT_PROFILE };
        try {
            const parsed = JSON.parse(saved);
            if (parsed && typeof parsed === "object") {
                return { ...DEFAULT_PROFILE, ...parsed };
            }
        } catch (error) {
            console.warn("解析自我介紹資料時發生問題，已改用預設值。", error);
        }
        return { ...DEFAULT_PROFILE };
    }

    function persistProfile() {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    }

    function loadSkills() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return [...DEFAULT_SKILLS];
        try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
                // --- Data migration ---
                parsed.forEach(skill => {
                    if (skill.visual && !skill.imageUrl) {
                        skill.imageUrl = VISUALS[skill.visual]?.image || "";
                    }
                });
                // --- End migration ---
                return parsed;
            }
        } catch (error) {
            console.warn("解析自訂區塊資料時發生問題，已改用預設值。", error);
        }
        return [...DEFAULT_SKILLS];
    }

    function persistSkills() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(skills));
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
        openDialog(panelModal);
        fieldTitle?.focus();
    });

    closePanelBtn?.addEventListener("click", () => closeDialog(panelModal));

    panelForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        const title = fieldTitle.value.trim();
        const description = fieldDescription.value.trim();
        const imageUrl = fieldImageUrl.value.trim(); // Get the URL
        if (!title || !description) return; // visual/imageUrl is now optional
        const newSkill = { id: `skill-${Date.now()}`, title, description, imageUrl }; // Use imageUrl
        skills = [newSkill, ...skills];
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
        if (target.dataset.action === "delete" && target.dataset.id) {
            if (!window.confirm("Delete this skill card?")) return;
            skills = skills.filter((skill) => skill.id !== target.dataset.id);
            persistSkills();
            renderSkills();
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