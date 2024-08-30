import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../Rducers/store";
import { toggleFavorite, fetchRepos } from "../Rducers/action";
import { Link } from "react-router-dom";

const RepoList: React.FC = () => {
    const dispatch = useDispatch();
    const { repos, load } = useSelector((state: RootState) => state.repos);
    const favorites = useSelector((state: RootState) => state.favorites);
    const [page] = React.useState<number>(1);

    useEffect(() => {
        dispatch(fetchRepos());
    }, [dispatch]);

    const handleFavoriteToggle = (repoId: number) => {
        dispatch(toggleFavorite(repoId));
    };


    return (
        <div className="container">
            {load ? (
                <p>Loading...</p>
            ) : (
                repos.map((repo) => (
                    <div className="card_item" key={repo.id}>
                        <div className="card_inner">
                            <img
                                src={repo.owner.avatar_url}
                                alt={`${repo.owner.login}'s avatar`}
                                className="repo-owner-avatar"
                            />
                            <div className="repo-details">
                                <h3 className="repoName">
                                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                        {repo.name}
                                    </a>
                                </h3>
                                <p className="repoDescription">{repo.description}</p>
                                <div className="repoUrl">
                                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                        {repo.html_url}
                                    </a>
                                </div>
                                <div className="detail-box">
                                    <Link to={`/owner/${repo.owner.login}`}>
                                        <button className="view-repos-button">View Repositories</button>
                                        </Link>
                                </div>
                            </div>
                            <div
                                className={`favorite-icon ${favorites.includes(repo.id) ? 'favorited' : ''}`}
                                onClick={() => handleFavoriteToggle(repo.id)}
                            >
                                <FontAwesomeIcon icon={faHeart} />
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default RepoList;
