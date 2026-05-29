
// Conforms ISO formatted dates into friendly UI dates
export const friendlyDate = (input) => {
    const date = new Date(input);

    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })
};

// Determins the read length based on word count
export const readLength = (count) => {
    if (count < 500) {
        return "Short";
    } else if (count >= 500 && count < 1500) {
        return "Medium";
    } else {
        return "Long";
    }
};

// Returns a tag for the read length of the post
export const handleReadLength = (count) => {
    if (count < 500) {
        return (
            <div className="read-length short-read">Short Read</div>
        )
    } else if (count >= 500 && count < 1500) {
        return (
            <div className="read-length med-read">Medium Read</div>
        )
    } else {
        return (
            <div className="read-length long-read">Long Read</div>
        )
    }
};