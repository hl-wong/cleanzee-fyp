const addressData = {
  states: [
    { label: "Johor", value: "Johor" },
    { label: "Kedah", value: "Kedah" },
    { label: "Kelantan", value: "Kelantan" },
    { label: "Melaka", value: "Melaka" },
    { label: "Negeri Sembilan", value: "Negeri Sembilan" },
    { label: "Pahang", value: "Pahang" },
    { label: "Penang", value: "Penang" },
    { label: "Perak", value: "Perak" },
    { label: "Perlis", value: "Perlis" },
    { label: "Sabah", value: "Sabah" },
    { label: "Sarawak", value: "Sarawak" },
    { label: "Selangor", value: "Selangor" },
    { label: "Terengganu", value: "Terengganu" },
    { label: "Kuala Lumpur", value: "Kuala Lumpur" },
  ],
  cities: {
    Johor: [
      {
        label: "Johor Bahru",
        value: "Johor Bahru",
        districts: ["Tebrau", "Larkin", "Skudai"],
      },
      {
        label: "Iskandar Puteri",
        value: "Iskandar Puteri",
        districts: ["Bukit Indah", "Nusa Bestari", "Gelang Patah"],
      },
      {
        label: "Batu Pahat",
        value: "Batu Pahat",
        districts: ["Tongkang Pechah", "Sri Gading", "Parit Raja"],
      },
      {
        label: "Kluang",
        value: "Kluang",
        districts: ["Taman Sri Kluang", "Taman Kluang Indah", "Renggam"],
      },
      {
        label: "Muar",
        value: "Muar",
        districts: ["Tangkak", "Parit Jawa", "Pagoh"],
      },
      {
        label: "Segamat",
        value: "Segamat",
        districts: ["Buloh Kasap", "Labis", "Gemas"],
      },
    ],
    Kedah: [
      {
        label: "Alor Setar",
        value: "Alor Setar",
        districts: ["Mergong", "Simpang Kuala", "Tanjung Bendahara"],
      },
      {
        label: "Sungai Petani",
        value: "Sungai Petani",
        districts: ["Amanjaya", "Taman Sejati", "Bakar Arang"],
      },
      {
        label: "Kulim",
        value: "Kulim",
        districts: ["Lunas", "Padang Serai", "Taman Selasih"],
      },
      {
        label: "Langkawi",
        value: "Langkawi",
        districts: ["Kuah", "Padang Matsirat", "Pantai Cenang"],
      },
    ],
    Kelantan: [
      {
        label: "Kota Bharu",
        value: "Kota Bharu",
        districts: ["Kubang Kerian", "Wakaf Bharu", "Pengkalan Chepa"],
      },
      {
        label: "Pasir Mas",
        value: "Pasir Mas",
        districts: ["Rantau Panjang", "Tendong", "Bunut Susu"],
      },
      {
        label: "Tanah Merah",
        value: "Tanah Merah",
        districts: ["Jedok", "Bukit Bunga", "Gual Ipoh"],
      },
    ],
    Melaka: [
      {
        label: "Malacca City",
        value: "Malacca City",
        districts: ["Ayer Keroh", "Batu Berendam", "Klebang"],
      },
    ],
    "Negeri Sembilan": [
      {
        label: "Seremban",
        value: "Seremban",
        districts: ["Senawang", "Ampangan", "Rasah"],
      },
      {
        label: "Port Dickson",
        value: "Port Dickson",
        districts: ["Teluk Kemang", "Lukut", "Pasir Panjang"],
      },
    ],
    Pahang: [
      {
        label: "Kuantan",
        value: "Kuantan",
        districts: ["Beserah", "Gambang", "Indera Mahkota"],
      },
      {
        label: "Temerloh",
        value: "Temerloh",
        districts: ["Mentakab", "Kerdau", "Jengka"],
      },
      {
        label: "Bentong",
        value: "Bentong",
        districts: ["Janda Baik", "Genting Highlands", "Karak"],
      },
      {
        label: "Mentakab",
        value: "Mentakab",
        districts: ["Taman Temerloh", "Simpang Kampung Tengah"],
      },
    ],
    Perak: [
      {
        label: "Ipoh",
        value: "Ipoh",
        districts: ["Bercham", "Menglembu", "Simpang Pulai"],
      },
      {
        label: "Taiping",
        value: "Taiping",
        districts: ["Kamunting", "Aulong", "Taman Simpang"],
      },
      {
        label: "Teluk Intan",
        value: "Teluk Intan",
        districts: ["Hutan Melintang", "Changkat Jong", "Batu 12"],
      },
      {
        label: "Manjung",
        value: "Manjung",
        districts: ["Seri Manjung", "Sitiawan", "Pangkor"],
      },
    ],
    Perlis: [
      {
        label: "Kangar",
        value: "Kangar",
        districts: ["Taman Bukit Kayangan", "Sena", "Utah"],
      },
      {
        label: "Arau",
        value: "Arau",
        districts: ["Taman Saujana Indah", "Jejawi", "Tambun Tulang"],
      },
    ],
    Sabah: [
      {
        label: "Kota Kinabalu",
        value: "Kota Kinabalu",
        districts: ["Inanam", "Penampang", "Likas"],
      },
      {
        label: "Sandakan",
        value: "Sandakan",
        districts: ["Batu Sapi", "Kinabatangan", "Taman Mawar"],
      },
      {
        label: "Tawau",
        value: "Tawau",
        districts: ["Balung", "Merotai", "Apas"],
      },
    ],
    Sarawak: [
      {
        label: "Kuching",
        value: "Kuching",
        districts: ["Petra Jaya", "Matang", "Batu Kawa"],
      },
      {
        label: "Miri",
        value: "Miri",
        districts: ["Pujut", "Senadin", "Taman Tunku"],
      },
      {
        label: "Sibu",
        value: "Sibu",
        districts: ["Rejang Park", "Tiong Hua", "Sg. Merah"],
      },
      {
        label: "Bintulu",
        value: "Bintulu",
        districts: ["Tanjung Batu", "Sebauh", "Kidurong"],
      },
    ],
    Selangor: [
      {
        label: "Shah Alam",
        value: "Shah Alam",
        districts: ["Seksyen 7", "Seksyen 13", "Seksyen U8"],
      },
      {
        label: "Petaling Jaya",
        value: "Petaling Jaya",
        districts: ["Damansara", "Kelana Jaya", "Bandar Utama"],
      },
      {
        label: "Subang Jaya",
        value: "Subang Jaya",
        districts: ["USJ", "Putra Heights", "SS15"],
      },
      {
        label: "Klang",
        value: "Klang",
        districts: ["Bandar Botanic", "Bukit Tinggi", "Meru"],
      },
      {
        label: "Kajang",
        value: "Kajang",
        districts: ["Saujana Impian", "Sg. Chua", "Bandar Baru Bangi"],
      },
      {
        label: "Selayang",
        value: "Selayang",
        districts: ["Batu Caves", "Rawang", "Kepong"],
      },
      {
        label: "Puchong",
        value: "Puchong",
        districts: ["Bandar Puteri", "Taman Kinrara", "Bukit Puchong"],
      },
      {
        label: "Rawang",
        value: "Rawang",
        districts: ["Taman Garing", "Serendah", "Bukit Beruntung"],
      },
    ],
    Terengganu: [
      {
        label: "Kuala Terengganu",
        value: "Kuala Terengganu",
        districts: ["Kampung Tok Jiring", "Chendering", "Bukit Besar"],
      },
      {
        label: "Kemaman",
        value: "Kemaman",
        districts: ["Kijal", "Kerteh", "Cukai"],
      },
      {
        label: "Dungun",
        value: "Dungun",
        districts: ["Paka", "Kampung Sura", "Bukit Besi"],
      },
    ],
    "Kuala Lumpur": [
      {
        label: "Kepong",
        value: "Kepong",
        districts: ["Taman Kepong", "Metro Prima", "Menjalara"],
      },
    ],
  },
};

export default addressData;
