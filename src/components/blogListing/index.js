import React from 'react'
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './blogListing.css'
import { useBlogListing } from '../../talons/useBlogListing'
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import BlogListingItem from '../blogListingItem'
import Pagination from '@magento/venia-ui/lib/components/Pagination';

const BlogListing = props => {
    const { filterType, filterValue } = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    const talonProps = useBlogListing({ filterType, filterValue })
    const {
        blogData,
        blogLoading,
        blogError
    } = talonProps

    if (blogLoading)
        return <LoadingIndicator />
    if (blogError || !blogData || !blogData.mpBlogPosts)
        return ''
    const { mpBlogPosts } = blogData;
    if (!mpBlogPosts.items || !mpBlogPosts.total_count)
        return <div className={classes.blogEmpty} >{'Cannot find any post'}</div>

    return (
        <div className={classes.blogListingCtn} >
            {
                mpBlogPosts.items.map(item =>
                    <BlogListingItem classes={classes} item={item} />
                )
            }
            <div className={classes.pagination}>
                <Pagination pageControl={pageControl} />
            </div>
        </div>
    )
}
export default BlogListing