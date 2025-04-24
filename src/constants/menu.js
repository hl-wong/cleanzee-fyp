const profileMenu = [
  {
    title: "General",
    data: [
      {
        icon: "event",
        label: "My Bookings",
        desc: "View and manage your upcoming services",
        navigate: {
          stack: "Profile Stack",
          screen: "My Booking Stack",
        },
      },
      {
        icon: "notifications",
        label: "Notifications",
        desc: "Stay updated with alerts and updates",
        navigate: { stack: "Profile Stack", screen: "Notification Screen" },
      },
    ],
  },
  {
    title: "Account",
    data: [
      {
        icon: "location-pin",
        label: "My Addresses",
        desc: "Manage your saved service locations",
        navigate: { stack: "Profile Stack", screen: "My Address Stack" },
      },
      {
        icon: "account-circle",
        label: "Edit Profile",
        desc: "Update your personal details",
        navigate: { stack: "Profile Stack", screen: "Edit Profile Screen" },
      },
      {
        icon: "lock",
        label: "Change Password",
        desc: "Update your account password securely",
        navigate: { stack: "Profile Stack", screen: "Change Password Screen" },
      },
      {
        icon: "delete",
        label: "Delete Account",
        desc: "Permanently remove your account",
        navigate: {},
      },
    ],
  },
  {
    title: "Support",
    data: [
      {
        icon: "help",
        label: "Help Center",
        desc: "",
        navigate: { stack: "Profile Stack", screen: "Help Center Screen" },
      },
      {
        icon: "logout",
        label: "Log Out",
        desc: "",
        navigate: {},
      },
    ],
  },
];

const cleanerMenu = [
  {
    title: "General",
    data: [
      {
        icon: "event",
        label: "My Bookings",
        desc: "View and manage service requests",
        navigate: {
          stack: "Profile Stack",
          screen: "My Booking Stack",
        },
      },
      {
        icon: "notifications",
        label: "Notifications",
        desc: "Stay updated with alerts and updates",
        navigate: {
          stack: "Profile Stack",
          screen: "Notification Screen",
        },
      },
    ],
  },
  {
    title: "Services",
    data: [
      {
        icon: "work",
        label: "My Services",
        desc: "Manage the services you offer",
        navigate: {
          stack: "Profile Stack",
          screen: "My Service Stack",
        },
      },
      {
        icon: "library-add",
        label: "Browse Services",
        desc: "Choose predefined services to offer",
        navigate: {
          stack: "Profile Stack",
          screen: "Browse Service Stack",
        },
      },
      {
        icon: "schedule",
        label: "Set Availability",
        desc: "Set working hours and days off",
        navigate: {
          stack: "Profile Stack",
          screen: "Set Availability Screen",
        },
      },
      {
        icon: "account-balance-wallet",
        label: "My Balance",
        desc: "View current balance and transaction history",
        navigate: {
          stack: "Profile Stack",
          screen: "My Balance Screen",
        },
      },
      {
        icon: "star",
        label: "Ratings And Reviews",
        desc: "View customer feedback and ratings",
        navigate: {
          stack: "Profile Stack",
          screen: "Rating And Review Screen",
        },
      },
    ],
  },
  {
    title: "Account",
    data: [
      {
        icon: "account-circle",
        label: "Edit Profile",
        desc: "Update your personal details",
        navigate: {
          stack: "Profile Stack",
          screen: "Edit Profile Screen",
        },
      },
      {
        icon: "lock",
        label: "Change Password",
        desc: "Update your account password securely",
        navigate: {
          stack: "Profile Stack",
          screen: "Change Password Screen",
        },
      },
      {
        icon: "delete",
        label: "Delete Account",
        desc: "Permanently remove your account",
        navigate: {},
      },
    ],
  },
  {
    title: "Support",
    data: [
      {
        icon: "help",
        label: "Help Center",
        desc: "",
        navigate: {
          stack: "Profile Stack",
          screen: "Help Center Screen",
        },
      },
      {
        icon: "logout",
        label: "Log Out",
        desc: "",
        navigate: {},
      },
    ],
  },
];

const adminMenu = [
  {
    title: "Management",
    data: [
      {
        icon: "check-circle",
        label: "Cleaner Approvals",
        desc: "Approve or reject cleaners",
        navigate: { stack: "Admin Stack", screen: "Cleaner Approval Screen" },
      },
      {
        icon: "build",
        label: "Service Management",
        desc: "Add, edit, or remove services",
        navigate: { stack: "Admin Stack", screen: "Service Management Stack" },
      },
      {
        icon: "event-note",
        label: "Booking Management",
        desc: "View and manage all customer bookings",
        navigate: { stack: "Admin Stack", screen: "Booking Management Stack" },
      },
    ],
  },
  {
    title: "Platform",
    data: [
      {
        icon: "campaign",
        label: "Advertisements",
        desc: "Showcase promotions, and limited-time discounts",
        navigate: { stack: "Admin Stack", screen: "Advertisement Stack" },
      },
    ],
  },
  {
    title: "Account",
    data: [
      {
        icon: "logout",
        label: "Log Out",
        desc: "Sign out from admin panel",
        navigate: {},
      },
    ],
  },
];

const categoryMenu = [
  {
    name: "sanitizer",
    label: "Deep Cleaning",
  },
  {
    name: "construction",
    label: "Post-Renovation Cleaning",
  },
  {
    name: "window",
    label: "Window Cleaning",
  },
  {
    name: "weekend",
    label: "Carpet Cleaning",
  },
  {
    name: "home",
    label: "Residential Cleaning",
  },
  {
    name: "storefront",
    label: "Commercial Cleaning",
  },
];

export { profileMenu, cleanerMenu, adminMenu, categoryMenu };
