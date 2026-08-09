export const GAME_DATA = {
  // Stage 1 - ERROR 404
  recoveryKey: "SaVer1930",

  // Stage 2 - Case 1: First Contact (WhatsApp)
  firstContactChat: "halo boti ngh.",

  // Stage 2 - Case 2: Anniversary (Sliding Puzzle)
  // Masukkan target angka secara berurutan. Format awalnya adalah: 2026, 13, [kosong], 02
  anniversaryTarget: {
    day: "13",
    month: "02",
    year: "2026",
  },

  // Stage 2 - Case 3: Separation (Drag and Drop Chat)
  // Isi dengan pesan-pesan yang ingin diurutkan, dari urutan yang BENAR (pertama → terakhir)
  // sender: 'marilyn' = kanan (merah) | sender: 'adika' = kiri (biru)
  // Contoh:
  // { id: "1", sender: "marilyn", text: "savy, hey" },
  // { id: "2", sender: "adika",   text: "HEY" },
  separationChats: [
    { id: "1",  sender: "marilyn", text: "savy, hey" },
    { id: "2",  sender: "adika",   text: "HEY" },
    { id: "3",  sender: "adika",   text: "hadir" },
    { id: "4",  sender: "marilyn", text: "got deleted again" },
    { id: "5",  sender: "marilyn", text: "savy" },
    { id: "6",  sender: "marilyn", text: "let's break up, or.. divorce." },
    { id: "7",  sender: "marilyn", text: "thanks.. for everything you gave to me" },
    { id: "8",  sender: "marilyn", text: "i'm so sorry, i have no other choice" },
    { id: "9",  sender: "marilyn", text: "and i don't have much time" },
    { id: "10", sender: "marilyn", text: "happy early birthday" },
    { id: "11", sender: "adika",   text: "aa.." },
    { id: "12", sender: "adika",   text: "you won't even wait till my birthday?" },
    { id: "13", sender: "marilyn", text: "i don't have much time" },
    { id: "14", sender: "marilyn", text: "i'm sorry" },
    { id: "15", sender: "marilyn", text: "but really, thank you for everything" },
  ],

  // Final Stage - Reward Link
  scrapbookLink: "https://canva.com/scrapbook-river",
};
