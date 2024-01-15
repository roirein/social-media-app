import AppTemplate from "@/components/application/app-template/app-template"

const FeedPage = (props) => {
    return (
        <AppTemplate>
            {props.children}
        </AppTemplate>
    )
}

export default FeedPage