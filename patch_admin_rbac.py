import re

with open(r"frontend\src\pages\AdminDashboard.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add Role Extraction and Update default tab state
old_state = """const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview'); // overview, scheme, merit, forecast"""

new_state = """const AdminDashboard = () => {
  const userRole = localStorage.getItem('userRole') || 'OFFICER'; // 'MINISTRY' or 'OFFICER'
  const [activeTab, setActiveTab] = useState(userRole === 'MINISTRY' ? 'overview' : 'merit'); // overview, scheme, merit, forecast"""

content = content.replace(old_state, new_state)

# 2. Add Badges to Header depending on role
old_header = """            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Ministry / Nodal Officer Portal</h1>
            <p className="mt-2 text-sm text-gray-500">Manage schemes, process applications, and oversee DBT disbursements.</p>"""

new_header = """            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center">
              {userRole === 'MINISTRY' ? 'Ministry Executive Portal' : 'Nodal Officer Dashboard'}
              <span className={`ml-4 px-3 py-1 text-xs font-bold rounded-full ${userRole === 'MINISTRY' ? 'bg-[#D49A36] text-white' : 'bg-[#1E5642] text-white'}`}>
                {userRole === 'MINISTRY' ? 'EXECUTIVE VIEW' : 'ADMINISTRATOR VIEW'}
              </span>
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              {userRole === 'MINISTRY' 
                ? 'High-level analytics and predictive budget forecasting for MoTA.' 
                : 'Manage schemes, process applications, and oversee DBT disbursements.'}
            </p>"""

content = content.replace(old_header, new_header)

# 3. Filter Tabs Based on Role
old_tabs = """          <div className="flex space-x-6 text-sm font-medium text-gray-600">
            <button onClick={() => setActiveTab('overview')} className={`pb-2 ${activeTab === 'overview' ? 'text-[var(--color-mota-forest)] border-b-2 border-[var(--color-mota-forest)]' : 'hover:text-gray-900'}`}>Overview</button>
            <button onClick={() => setActiveTab('scheme')} className={`pb-2 flex items-center ${activeTab === 'scheme' ? 'text-[var(--color-mota-forest)] border-b-2 border-[var(--color-mota-forest)]' : 'hover:text-gray-900'}`}><PlusCircle size={16} className="mr-1"/> Scheme Config</button>
            <button onClick={() => setActiveTab('merit')} className={`pb-2 flex items-center ${activeTab === 'merit' ? 'text-[var(--color-mota-forest)] border-b-2 border-[var(--color-mota-forest)]' : 'hover:text-gray-900'}`}><Award size={16} className="mr-1"/> Merit Selection</button>
            <button onClick={() => setActiveTab('forecast')} className={`pb-2 flex items-center ${activeTab === 'forecast' ? 'text-[var(--color-mota-forest)] border-b-2 border-[var(--color-mota-forest)]' : 'hover:text-gray-900'}`}><TrendingUp size={16} className="mr-1"/> Budget Forecast</button>
          </div>"""

new_tabs = """          <div className="flex space-x-6 text-sm font-medium text-gray-600">
            <button onClick={() => setActiveTab('overview')} className={`pb-2 ${activeTab === 'overview' ? 'text-[var(--color-mota-forest)] border-b-2 border-[var(--color-mota-forest)]' : 'hover:text-gray-900'}`}>Overview</button>
            
            {userRole === 'OFFICER' && (
              <>
                <button onClick={() => setActiveTab('scheme')} className={`pb-2 flex items-center ${activeTab === 'scheme' ? 'text-[var(--color-mota-forest)] border-b-2 border-[var(--color-mota-forest)]' : 'hover:text-gray-900'}`}><PlusCircle size={16} className="mr-1"/> Scheme Config</button>
                <button onClick={() => setActiveTab('merit')} className={`pb-2 flex items-center ${activeTab === 'merit' ? 'text-[var(--color-mota-forest)] border-b-2 border-[var(--color-mota-forest)]' : 'hover:text-gray-900'}`}><Award size={16} className="mr-1"/> Merit Selection</button>
              </>
            )}
            
            {userRole === 'MINISTRY' && (
              <button onClick={() => setActiveTab('forecast')} className={`pb-2 flex items-center ${activeTab === 'forecast' ? 'text-[var(--color-mota-forest)] border-b-2 border-[var(--color-mota-forest)]' : 'hover:text-gray-900'}`}><TrendingUp size={16} className="mr-1"/> Budget Forecast</button>
            )}
          </div>"""

content = content.replace(old_tabs, new_tabs)

with open(r"frontend\src\pages\AdminDashboard.jsx", "w", encoding="utf-8") as f:
    f.write(content)
