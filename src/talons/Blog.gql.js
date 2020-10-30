import gql from 'graphql-tag';


const PageInfoFragment = gql`
    fragment PageInfoFragment on PageInfo {
        pageSize
        currentPage
        hasNextPage
        hasPreviousPage
        startPage
        endPage
    }
`

const CategoryFragment = gql`
    fragment CategoryFragment on Category {
        category_id
        name
        url_key
        description
        store_ids
        enabled
        meta_title
        meta_keywords
        meta_description
        meta_robots
        parent_id
        path
        position
        level
        children_count
        created_at
        updated_at
        import_source
    }
`

const TagFragment = gql`
    fragment TagFragment on Tag {
        tag_id
        name
        description
        store_ids
        enabled
        url_key
        meta_title
        meta_keywords
        meta_description
        meta_robots
        created_at
        updated_at
        import_source
    }
`

const TopicFragment = gql`
    fragment TopicFragment on Topic {
        topic_id
        name
        description
        store_ids
        enabled
        url_key
        meta_title
        meta_keywords
        meta_description
        meta_robots
        created_at
        updated_at
        import_source
    }
`

const ProductFragment = gql`
    fragment ProductFragment on Product {
        entity_id
        attribute_set_id
        type_id
        sku
        has_options
        required_options
        created_at
        updated_at
    }
`

const PostFragment = gql`
    fragment PostFragment on Post {
        post_id
        name
        short_description
        image
        enabled
        url_key
        in_rss
        allow_comment
        meta_title
        meta_keywords
        meta_description
        meta_robots
        created_at
        updated_at
        author_id
        publish_date
        import_source
        layout
    }
`

export const GET_BLOG_POSTS = gql`
    query mpBlogPosts (
        $action : String!,
        $filter : PostsFilterInput,
        $authorName : String,
        $tagName : String,
        $topicId : Int,
        $categoryId : Int,
        $categoryKey : String,
        $postId : Int,
        $pageSize : Int,
        $currentPage : Int
    ) {
        mpBlogPosts (
            action : $action
            filter: $filter
            authorName : $authorName
            tagName : $tagName
            topicId : $topicId
            categoryId : $categoryId
            categoryKey : $categoryKey
            postId : $postId
            pageSize : $pageSize
            currentPage : $currentPage
        ) {
            items {
                ...PostFragment
                categories {
                    total_count
                    items {
                        ...CategoryFragment
                    }
                }
                tags {
                    total_count
                    items {
                        ...TagFragment
                    }
                }
                topics {
                    total_count
                    items {
                        ...TopicFragment
                    }
                }
                products {
                    total_count
                    items {
                        ...ProductFragment
                    }
                }
            }
            total_count
            pageInfo {
                ...PageInfoFragment
            }
        }
    }
    ${PostFragment}
    ${PageInfoFragment}
    ${CategoryFragment}
    ${TagFragment}
    ${TopicFragment}
    ${ProductFragment}
`;

export const GET_SEARCH_BLOG_POST = gql`
    query mpBlogPosts (
        $query : String!
    ) {
        mpBlogPosts (
            action : "get_post_list",
            filter : {
                name : {
                    like: $query
                }
            }
        ) {
            items {
                post_id
                name
                short_description
                image
                enabled
                url_key
                publish_date
            }
        }
    }
    ${PostFragment}
`

export const GET_BLOG_CATEGORIES = gql`
    query mpBlogCategories{
        mpBlogCategories (
            action : "get_category_list"
            pageSize: 999
        ) {
            items {
                ...CategoryFragment
            }
        }
    }
    ${CategoryFragment}
`

export const GET_BLOG_TAGS = gql`
    query mpBlogTags{
        mpBlogTags {
            items {
                ...TagFragment
                posts {
                    items {
                        post_id
                    }
                }
            }
        }
    }
    ${TagFragment}
`

export const GET_BLOG_TOPICS = gql`
    query mpBlogTopics{
        mpBlogTopics {
            items {
                ...TopicFragment
            }
        }
    }
    ${TopicFragment}
`


export const GET_SIDEBAR_BLOG_POSTS = gql`
    query mpBlogPosts (
        $filter : PostsFilterInput,
    ) {
        mpBlogPosts (
            action : "get_post_list"
            filter: $filter
            pageSize: 5
        ) {
            items {
                post_id
                name
                short_description
                image
                enabled
                url_key
                publish_date
            }
        }
    }
`