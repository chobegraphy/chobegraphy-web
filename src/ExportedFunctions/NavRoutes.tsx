interface RouteType {
    path: string;
    bnName: string;
    enName: string;
}
export const NavRoutes: RouteType[] = [
    {
        path: "/",
        enName: "Home",
        bnName: "হোম",
    },
    {
        path: "/AllImg?filter=recent&CurrentPage=1",
        enName: "Gallery",
        bnName: "গ্যালারি",
    },
    // {
    //     path: "/Team",
    //     enName: "Team",
    //     bnName: "টিম",
    // }, {
    //     path: "/Pages",
    //     enName: "Pages",
    //     bnName: "পেইজ",
    // }, {
    //     path: "/Event",
    //     enName: "Event",
    //     bnName: "ইভেন্ট"
    // },
    // {
    //     path: "/About",
    //     enName: "About Us",
    //     bnName: "আমাদের সম্পর্কে"
    // }

]

export const ProfileRoutes: RouteType[] = [
    {
        path: "/Dashboard?status=About%20Me&CurrentPage=1",
        enName: "Profile",
        bnName: "প্রোফাইল",
    },
    {
        path: "/Dashboard/MyUploads?status=Approved&CurrentPage=1",
        enName: "My Uploads",
        bnName: "আমার আপলোড",

    },
    // {
    //     path: "/Dashboard/FavoritePictures",
    //     enName: "Favorite Pictures",
    //     bnName: "প্রিয় ছবি",
    // },
    // {
    //     path: "/FavoritePresets",
    //     enName: "Favorite Lightroom Presets",
    //     bnName: "প্রিয় লাইটরুম প্রিসেট",
    // },

]

export const teamMemberRoutes: RouteType[] = [
    {
        path: "/TeamMember/Pending?status=Pending&CurrentPage=1",
        enName: "Pending Uploads",
        bnName: "পেন্ডিং আপলোড",
    }, {
        path: "/TeamMember/Approved?status=Approved&CurrentPage=1",
        enName: "Approved Uploads",
        bnName: "অ্যাপ্রুভড করা ছবি",
    }
]