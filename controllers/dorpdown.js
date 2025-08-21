function toggleDropdown(event) {
    event.preventDefault();
    const dropdown = event.currentTarget.parentElement;

    // Cierra otros dropdowns
    document.querySelectorAll(".dropdown").forEach(d => {
        if (d !== dropdown) d.classList.remove("active");
    });

    // Alterna el actual
    dropdown.classList.toggle("active");
}
