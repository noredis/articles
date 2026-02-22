type NotFoundProps = {
    content: string;
};

export const NotFound = ({content}: NotFoundProps) => {
    return (
        <div className="error-page">
            <div>404</div>
            <div>{content}</div>
        </div>
    );
};
