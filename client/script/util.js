const getCurrentPath = () => {
    const query = new URLSearchParams(window.location.search);
    return query.get("path");
}
