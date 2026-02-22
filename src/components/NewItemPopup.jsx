import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// រៀបចំ Supabase Client (ជំនួស URL និង Key របស់អ្នក)
const supabase = createClient("YOUR_SUPABASE_URL", "YOUR_SUPABASE_ANON_KEY");

const NewItemPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [newItem, setNewItem] = useState(null);

    useEffect(() => {
        const checkNewItems = async () => {
            // ១. ទាញយក Item ចុងក្រោយបង្អស់ពី Table "projects"
            const { data, error } = await supabase
                .from("projects")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(1)
                .single();

            if (data && !error) {
                // ២. ឆែកមើលក្នុង localStorage ថាអ្នកប្រើប្រាស់បានឃើញ ID នេះនៅ?
                const lastSeenId = localStorage.getItem("last_seen_project_id");

                if (lastSeenId !== data.id.toString()) {
                    setNewItem(data);
                    // បង្ហាញ Popup បន្ទាប់ពី ២ វិនាទី
                    setTimeout(() => setIsOpen(true), 2000);
                }
            }
        };

        checkNewItems();
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        // ៣. រក្សាទុក ID ដែលបានឃើញរួច ដើម្បីកុំឱ្យលោតមកទៀត
        if (newItem) {
            localStorage.setItem("last_seen_project_id", newItem.id);
        }
    };

    if (!isOpen || !newItem) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div
                className="bg-zinc-900 border-2 border-yellow-500 p-8 rounded-2xl max-w-sm w-full relative shadow-[0_0_30px_rgba(234,179,8,0.4)] text-center"
                data-aos="zoom-in"
            >
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-4 text-3xl text-gray-400 hover:text-white"
                >
                    &times;
                </button>

                <div className="text-5xl mb-4">🔥</div>
                <h2 className="text-2xl font-bold text-yellow-500 mb-2">គម្រោងថ្មីមកដល់ហើយ!</h2>
                <p className="text-gray-300 mb-6">
                    ខ្ញុំទើបតែបានបញ្ចូលគម្រោងថ្មី៖ <br />
                    <span className="text-white font-semibold">"{newItem.title}"</span>
                </p>

                <button
                    onClick={handleClose}
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl transition-all transform active:scale-95"
                >
                    ចូលមើលឥឡូវនេះ
                </button>
            </div>
        </div>
    );
};

export default NewItemPopup;