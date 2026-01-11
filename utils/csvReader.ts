// để đọc file và xử lý file thì cần import các lib sau
// fs/promise
// path -> tìm đường dẫn tuyệt đối
// csv-parse -> để phân tích file csv
import {readFile} from 'fs/promises'
import path, {join} from 'path'
import {parse} from 'csv-parse/sync'
import { promises } from 'dns';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url'
import { highLightAndScreenshot } from '../utils/screenshot';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// định nghĩa dữ liệu trong file csv
export interface LoginData{
    username: string;
    password: string;
    expected_result: string;
    description: string;
}

export const readFileFromCsv = ():LoginData[] =>{
    // B1: xác định đường dẫn tới file csv
    // ../data/login-data.csv
    //__dirname: xác định path của file hiện tại (csvReader.ts)

    const csvPath = join(__dirname, '..','data', 'login-data.csv');

    // B2: đọc file csv
    const fileContent = readFileSync(csvPath)
    // b3: parse data string => list LoginData
    const data = parse(fileContent, {
        columns: true, // lấy dòng đầu làm header, làm key
        skip_empty_lines: true, // bỏ qua dòng trống
        trim: true // bỏ khoảng trắng thừa
    }) as LoginData[];

    return data;
}