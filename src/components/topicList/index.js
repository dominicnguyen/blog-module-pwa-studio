import React from 'react';
import classes from './topicList.css'
import { GET_BLOG_TOPICS } from '../../talons/Blog.gql'
import { useQuery } from '@apollo/client';
import { Link } from '@magento/venia-drivers';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { Folder as FolderIc } from 'react-feather';

const folderIcon = <Icon src={FolderIc} attrs={{ width: 13 }} />;

const TopicList = () => {
    const {
        data: topicListData
    } = useQuery(GET_BLOG_TOPICS)

    if (topicListData && topicListData.mpBlogTopics && topicListData.mpBlogTopics.items) {
        const topicItems = topicListData.mpBlogTopics.items;
        return (
            <div className={classes.topicListRoot}>
                <div className={classes.topicListHeader}>{`Topics`}</div>
                <div className={classes.topicItems}>
                    {topicItems.map(topicItem => {
                        return (
                            <Link className={classes.topicItem} to={`/blog/topic/${topicItem.url_key}.html`}>
                                {folderIcon} {topicItem.name}
                            </Link>
                        )
                    })}
                </div>
            </div>
        )
    }
    return ''
}
export default TopicList