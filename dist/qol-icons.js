// Small, consistent 24px line symbols for daily routines and Eurodollars.
export const qolIcons=[
 ['eurodollar','Eurodollar / Euro dollars / €$','<path d="M10 6C5 2 2 7 2 12s3 10 8 6M1 10h7m-7 4h6m14-7c-1-3-8-3-8 1 0 5 9 2 9 7 0 4-7 5-10 1m6-14v20"/>'],
 ['toothbrush','Toothbrush','<path d="m3 21 11-11m-1-1 2 2 6-6-2-2Zm2-4 2 2m0-4 2 2m0-4 2 2"/>'],
 ['tooth','Tooth','<path d="M12 5C8 2 3 3 3 8c0 4 2 5 2 9 0 5 4 5 4 0 0-4 6-4 6 0 0 5 4 5 4 0 0-4 2-5 2-9 0-5-5-6-9-3Zm0 0 3 2"/>'],
 ['shower','Shower','<path d="M4 21V6a3 3 0 0 1 6 0v2m-3 4 1-3h4l1 3Zm1 3v1m4-1v1m-6 3v1m4-1v1m4-1v1"/>'],
 ['shirt','Shirt','<path d="m8 3 4 2 4-2 5 5-3 3-2-2v12H8V9l-2 2-3-3Zm0 0a4 4 0 0 0 8 0"/>'],
 ['pants','Pants / trousers','<path d="M6 3h12l2 18h-6l-2-11-2 11H4Zm0 4h12m-6-4v7M6 7l-1 4m13-4 1 4"/>'],
 ['hairbrush','Hair brush','<rect x="7" y="2" width="10" height="12" rx="4"/><path d="M10 14v6a2 2 0 0 0 4 0v-6M10 5v6m4-6v6m-4-3h4"/>'],
 ['medical','Medical / first aid','<rect x="3" y="6" width="18" height="15" rx="2"/><path d="M8 6V3h8v3m-4 5v6m-3-3h6"/>'],
 ['inhaler','Inhaler','<rect x="6" y="2" width="9" height="4" rx="1"/><path d="M7 6v8H5v7h15v-7h-6V6M5 17h10m-5-8h1"/>'],
 ['syringe','Syringe','<path d="m17 2 5 5m-2-3-5 5M9 6l9 9m-7-7L4 15v5h5l7-7M4 20l-2 2m6-10 3 3m0-6 3 3"/>'],
 ['checkerboard','Checkered board / checkerboard / checkers','<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M9 3v18m6-18v18M3 9h18M3 15h18"/><path fill="currentColor" stroke="none" d="M4 4h4v4H4Zm12 0h4v4h-4Zm-6 6h4v4h-4ZM4 16h4v4H4Zm12 0h4v4h-4Z"/>'],
 ['chess','Chess / king','<path d="M12 2v6M9 4h6M7 9h10l-2 5v4H9v-4ZM9 14h6M9 18l-3 3h12l-3-3Z"/>'],
 ['heart','Heart','<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-1 1-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>']
].map(([id,label,markup])=>({id:'dd:qol-'+id,label,markup}));
