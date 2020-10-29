import React, { useEffect, useState } from 'react';
import { GET_BLOG_POSTS } from './Blog.gql'
import { useQuery } from '@apollo/client';
import { useToasts } from '@magento/peregrine';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { AlertCircle as AlertCircleIcon } from 'react-feather';
import { usePagination } from '@magento/peregrine';

const errorIcon = <Icon src={AlertCircleIcon} attrs={{ width: 18 }} />;

export const useBlogListing = props => {
    const [pageSize, setPageSize] = useState(10);
    const [paginationValues, paginationApi] = usePagination();
    const { currentPage, totalPages } = paginationValues;
    const { setCurrentPage, setTotalPages } = paginationApi;

    const pageControl = {
        currentPage,
        setPage: setCurrentPage,
        totalPages
    };

    const {
        data: blogData,
        loading: blogLoading,
        error: blogError
    } = useQuery(GET_BLOG_POSTS,
        {
            variables: {
                action: 'get_post_list',
                currentPage: parseInt(currentPage),
                pageSize: parseInt(pageSize)
            }
        }
    )

    const [, { addToast }] = useToasts();

    // Set the total number of pages whenever the data changes.
    useEffect(() => {
        const totalPagesFromData = (blogData && blogData.mpBlogPosts && blogData.mpBlogPosts.pageInfo)
            ? blogData.mpBlogPosts.pageInfo.endPage
            : null;
        setTotalPages(totalPagesFromData);
        return () => {
            setTotalPages(null);
        };
    }, [blogData, setTotalPages]);

    if (blogError) {
        let derivedErrorMessage;
        const errorTarget = blogError;
        if (errorTarget.graphQLErrors) {
            derivedErrorMessage = errorTarget.graphQLErrors
                .map(({ message }) => message)
                .join(', ');
        } else {
            derivedErrorMessage = errorTarget.message;
        }
        if (derivedErrorMessage) {
            addToast({
                type: 'error',
                icon: errorIcon,
                message: derivedErrorMessage,
                dismissable: true,
                timeout: 7000
            });
        }
    }

    return {
        blogData,
        blogLoading,
        blogError,
        pageControl,
        pageSize,
        setPageSize
    }
}