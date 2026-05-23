

export const friendlyDate = (input) => {
    const date = new Date(input);

    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })
};