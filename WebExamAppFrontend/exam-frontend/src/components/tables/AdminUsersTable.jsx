import React, { Component } from 'react';

class AdminUsersTable extends Component {
    state = {  }
    render()
    {
        let tableBody = this.renderTable(this.props.table);
        return ( 
            <div className="overflow-x:auto">
                <table>
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Areas</th>
                        <th>Sub-Areas</th>
                        <th>Edit User</th>
                    </tr>
                    {tableBody}
                    </tbody>
                </table>
            </div>
         );
    }
}
 
export default AdminUsersTable;