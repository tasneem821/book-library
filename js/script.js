const library = {
    Fiction: [
        { title: "1984", author: "George Orwell", pages: 328 },
        { title: "Brave New World", author: "Aldous Huxley", pages: 268 }
    ],
    Science: [
        { title: "A Brief History of Time", author: "Stephen Hawking", pages: 256 }
    ]
};

function displayLibrary() {
    const libraryContainer = document.getElementById("book-list");
    libraryContainer.innerHTML = ""; 

    Object.keys(library).forEach(section => {
        const sectionDiv = document.createElement("div");
        sectionDiv.classList.add("library-section");
        sectionDiv.innerHTML = `<h3>${section}</h3>`;

        library[section].forEach(book => {
            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book");
            bookDiv.innerHTML = `<h3>${book.title}</h3><p>author: ${book.author}</p> <p>num of pages : ${book.pages}</p> `;
            sectionDiv.appendChild(bookDiv);
        });

        libraryContainer.appendChild(sectionDiv);
    });

    updateTotalPages();
    updateSectionDropdown();
}

function updateTotalPages() {
    const totalPages = Object.values(library).flat().reduce((sum, book) => sum + book.pages, 0);
    document.getElementById("total-pages").innerHTML = `<p>totalPages : ${totalPages}</p>`;
}

function updateSectionDropdown() {
    const sectionSelect = document.getElementById("selectSection");
    sectionSelect.innerHTML = '<option value="">Select Section</option>'; 

    Object.keys(library).forEach(section => {
        const option = document.createElement("option");
        option.value = section;
        option.textContent = section;
        sectionSelect.appendChild(option);
    });
}

document.getElementById("sectionform").addEventListener("submit", function (e) {
    e.preventDefault();
    const sectionName = document.getElementById("section").value.trim();

    if (sectionName && !library[sectionName]) {
        library[sectionName] = [];
        displayLibrary();
    }

    this.reset(); 
});

document.getElementById("bookform").addEventListener("submit", function (e) {
    e.preventDefault();
    const section = document.getElementById("selectSection").value;
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const pages = parseInt(document.getElementById("pagenums").value, 10);

    if (section && title && author && pages > 0) {
        library[section].push({ title, author, pages });
        displayLibrary();
    }

    this.reset(); 
});

displayLibrary();
