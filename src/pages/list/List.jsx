import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useMemo, useState } from 'react';
import { BE_URL } from '../../config';
import { CustomNoRowsOverlay } from './components/CustomNoRowsOverlay';
import { convertToHumanFriendlyTime } from '../../utils/TimeUtils';
import './List.css'

export default function List() {
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);

    const columns = useMemo(() => {
        return [
            {
                field: "id",
                width: 150,
                headerName: "Sr No.",
            },
            {
                field: "Name",
                width: 250,
            },
            {
                field: "Class",
                width: 250,
            },
            {
                field: "School",
                width: 200,
            },
            {
                field: "State",
                width: 200,
            },
            {
                field: "upload_date",
                headerName: "Uploaded on",
                width: 250,
                valueGetter: (params) => {
                    return convertToHumanFriendlyTime(params)
                },
            },
        ];
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const res = await fetch(
                `${BE_URL}/api/v1/csv/getData`,
                {
                    method: "GET",
                }
            );
            const data = await res.json();
            const rows = data?.json_data;
            console.log({ rows })
            setRows(rows);
            setLoading(false);
        };
        try {
            fetchData();
        } catch (error) {
            console.log({ error });
            setLoading(false);
        }
        return () => { };
    }, []);

    return (
        <div className='container'>
            <div className='table-container'>
                {columns && (
                    <DataGrid
                        sx={{
                            "& .MuiDataGrid-root .MuiDataGrid-cell": {
                                whiteSpace: "normal !important" /* don't work */,
                                wordWrap: "break-word !important" /* don't work */,
                            },
                        }}
                        columns={columns}
                        rows={rows || []}
                        loading={loading}
                        slots={{ toolbar: GridToolbar, noRowsOverlay: CustomNoRowsOverlay }}
                        getRowHeight={() => 100}
                    />
                )}
            </div>
        </div>
    );
}