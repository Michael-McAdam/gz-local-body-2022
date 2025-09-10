import React from "react";

export default function ElectionLinks() {
    // You may want to pass isAuckland as a prop, or calculate it here
    const isAuckland = false; // TODO: Replace with actual logic to determine if it's Auckland

    const linksTable = [
        {
            label: "Policy.nz",
            href: "https://policy.nz/2025",
        },
        {
            label: "Vote For Te Tiriti",
            href: "http://votefortetiriti.com",
        },
    ];

    const visibleLinks = linksTable.filter((link) => !link.exclude);

    return (
        <>
            <span>
                Don't just take our word for it! More info on local elections
                candidates:{" "}
            </span>
            {visibleLinks.map((link, i) => (
                <React.Fragment key={link.label}>
                    <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {link.label}
                    </a>
                    {i < visibleLinks.length - 1 ? ", " : null}
                </React.Fragment>
            ))}
        </>
    );
}
