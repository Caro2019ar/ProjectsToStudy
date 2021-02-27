import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

class TableHeader extends Component {
	raiseSort = (path) => {
		const sortColumn = { ...this.props.sortColumn };
		if (sortColumn.path === path)
			sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
		else {
			sortColumn.path = path;
			sortColumn.order = "asc";
		}
		this.props.onSort(sortColumn);
	};
	renderSortIcon = (column) => {
		const { sortColumn } = this.props;
		if (column.path !== sortColumn.path) return null;
		if (sortColumn.order === "asc") return <FontAwesomeIcon icon={faCaretUp} />;
		// return <i className="fas fa-chevron-up"></i>; dessa forma, não funcionou o Font Awesome
		return <FontAwesomeIcon icon={faCaretDown} />;
	};
	render() {
		return (
			<thead>
				<tr>
					{this.props.columns.map((column) => (
						<th
							className="clickable"
							key={column.path || column.key}
							onClick={() => this.raiseSort(column.path)}
						>
							{column.label} {this.renderSortIcon(column)}
						</th>
					))}
				</tr>
			</thead>
		);
	}
}

export default TableHeader;
