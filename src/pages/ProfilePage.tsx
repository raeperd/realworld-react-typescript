import React, { useCallback } from 'react';
import { getArticles } from '../api/article';
import { User } from '../api/authentication';
import ArticleToggle from './components/ArticleToggle';
import { followUser } from '../api/user';

export const PROFILE_PAGE_PATH = '/profile';

export default ({ user }: {user: User}) => {
  const handleClickFeed = useCallback((feed: ProfileFeed) => {
    if (feed === 'My Articles') {
      return getArticles({ author: user.username });
    }
    return getArticles({ favorited: user.username });
  }, [user]);
  return (
    <div className="profile-page">
      <UserInfo user={user} />
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <ArticleToggle
              feeds={['My Articles', 'Favorited Articles']}
              onClickFeed={handleClickFeed}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

type ProfileFeed = 'My Articles' | 'Favorited Articles'

const UserInfo = ({ user }: {user: User}) => (
  <div className="user-info">
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-md-10 offset-md-1">
          <img
            alt="profile"
            src={user.image || '//api.realworld.io/images/demo-avatar.png'}
            className="user-img"
          />
          <h4>{user.username}</h4>
          <p>
            {user.bio}
          </p>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary action-btn"
            onClick={() => followUser(user.username)}
          >
            <i className="ion-plus-round" />
            {`Follow ${user.username}`}
          </button>
        </div>
      </div>
    </div>
  </div>
);
