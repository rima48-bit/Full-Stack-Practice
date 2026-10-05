import React, { useState } from 'react'
import axios from 'axios'
import "./Finder.css";
import searchIcon from "../assets/search.png";

const Finder = () => {

    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");

    const handleSubmit = async () => {

        if (!username.trim()) {
            setError("Please enter a username");
            setProfile(null);
            return;
        }

        try {
            const response = await axios.get(
                `https://api.github.com/users/${username.trim()}`
            );

            setProfile(response.data);
            setError("");

        } catch (err) {
    console.log(err);
    console.log(err.response);
    
    setError("User not found");
    setProfile(null);
}

    };

    return (
        <div className="finder">

            <h1>GitHub Profile Finder</h1>

            <p className="finder__subtitle">
                Search for any GitHub user
            </p>

            <div className="finder__input">

                <input
                    type="text"
                    placeholder="Enter GitHub username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <button onClick={handleSubmit}>
                    <img src={searchIcon} alt="Search" />
                </button>

            </div>

            {error && <p className="error">{error}</p>}

            {profile && (
                <div className="profile">

                    <img
                        className="profile__avatar"
                        src={profile.avatar_url}
                        alt="Profile"
                    />

                    <div className="profile__info">
                        <h2>{profile.name || profile.login}</h2>
                        <p className="username">
                            @{profile.login}
                        </p>
                    </div>

                    <p className="bio">
                        {profile.bio || "No bio available"}
                    </p>

                    <div className="profile__stats">

                        <div>
                            <span>Followers</span>
                            <strong>{profile.followers}</strong>
                        </div>

                        <div>
                            <span>Following</span>
                            <strong>{profile.following}</strong>
                        </div>

                        <div>
                            <span>Repositories</span>
                            <strong>{profile.public_repos}</strong>
                        </div>

                    </div>

                    <a
                        href={profile.html_url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        View Profile
                    </a>

                </div>
            )}

        </div>
    )
}

export default Finder
