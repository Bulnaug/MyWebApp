Ein Projektmanagement-Dashboard

Ordnerstruktur:
    /src
    ┣ /components       # Wiederverwendbare UI-Elemente (z. B. Card, Modal)
    ┣ /features         # Business-Logik wie Boards, Tasks, Comments
    ┣ /pages            # Hauptansichten (Dashboard, Login etc.)
    ┣ /hooks            # Eigene React Hooks
    ┣ /store            # Zustand oder anderer State
    ┣ /lib              # Hilfsfunktionen, z. B. localStorage oder API-Mocks
    ┗ /App.jsx

Technologie-Stack:
    JSFramework - Vite + React
    CSSFramework - Tailwind CSS
    Routing	- React Router
        --State-Management - zustand (npm install zustand)--
    Drag & Drop - @dnd-kit/core (npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities)
    DatenBank - Supabase (https://supabase.com/, npm install @supabase/supabase-js)

Funktialitat jetzt:
    - Bord Ubersicht
    - Neue Boards erstellen
    - Neue Lists erstellen mit Boards Verknupfung
    - Neue Tasks auf Lits erstellen
    - Drag and drop for Tasks