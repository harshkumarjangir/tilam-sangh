import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchNavigationData } from "../redux/slices/navigationSlice";
// import { fetchNavigationData } from "../store/navigationSlice";

const Test = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(
        (state) => state.navigation
    );

    useEffect(() => {
        dispatch(fetchNavigationData());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Navigation Data:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            {/* <p>{data}</p> */}
        </div>
    );
};

export default Test;
