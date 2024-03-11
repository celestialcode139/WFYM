export interface IUsersDetails {
	_id: string;
	user_id: string;
	hobbies?: string[];
	height?: number;
	weight?: number;
	personality?:
		| "hourglass"
		| "round"
		| "inverted_triangle"
		| "rectangle"
		| "triangle";
	race?:
		| "South Asian"
		| "Black African"
		| "East Asian"
		| "Black American"
		| "Middle Eastern"
		| "White/Caucasian"
		| "Hispanic/Latino"
		| "Other";
	profession?: string;
	children_before?: number;
	political_party?: string;
	images?: string;
	religion?: "Islam" | "Christianity" | "Buddhism" | "Hinduism" | "Judaism";
	deal_breaker?: string;
	description?: string;
	highest_degree?: string;
	smoking_habits?: boolean;
	drink_habits?: boolean;
	intro_video?: string;
	full_body_video_short?: string;
	country?: string;
	state?: string;
	city?: string;
	location?: string;
	identity_type?: "id_proof" | "passport" | "driving_license";
	identity_proof?: string;
	identity_status?: "pending" | "approved" | "reject";
	subscription_id?: string; // Change the type to string if needed
	deleted_at?: Date;
	deleted_by?: string; // Change the type to string if needed
}
export interface IUser {
	_id: string;
	first_name: string;
	last_name: string;
	user_name: string;
	email: string;
	password: string;
	gender: "male" | "female";
	dob: Date;
	profile_images?: string;
	status: "active" | "deactive" | "delete";
	user_details?: string | IUsersDetails;
	ideal_person?: string | IIdealPersonality;
	user_subscriptions?: string | IUserSubscription;
	media_id?: string | IMedia;
	deleted_at?: Date;
	deleted_by?: string | IUser;
}
interface IIdealPersonality {
	_id: string;
	user_id: string;
	race:
		| "South Asian"
		| "Black African"
		| "East Asian"
		| "Black American"
		| "Middle Eastern"
		| "White/Caucasian"
		| "Hispanic/Latino"
		| "Other";
	looking_for?: "male" | "female";
	children_before?: number;
	political_party?: string;
	religion?: "Islam" | "Christianity" | "Buddhism" | "Hinduism" | "Judaism";
	minAge?: number;
	maxAge?: number;
	height?: number;
	weight?: number;
	personality?:
		| "hourglass"
		| "round"
		| "inverted_triangle"
		| "rectangle"
		| "triangle";
	location?: string;
	description?: string;
	deleted_at?: Date;
	deleted_by?: string;
}
export interface IMedia {
	_id: string;
	gallery: string[];
	introVideo?: string;
	bodyShort?: string;
	user_id: string | IUser;
}
export interface IUserSubscription {
	_id: string;
	user_id: string;
	expire_at: Date;
	subscription_id?: string | ISubscription;
	remaining_matches?: number;
	status: "Active" | "Deactive";
	deleted_at?: Date;
	deleted_by?: string;
}
export interface ISubscription {
	_id: string;
	title: string;
	amount: number;
	matches_per_months: number;
	duration_in_days: number;
	status: "Active" | "Deactive";
	deleted_at?: Date;
	deleted_by?: string;
}
export interface TokenResponse {
	_id?: string;
	status: number;
	data?: string;
	message?: string;
}
export interface IMatchRequest {
	_id: string;
	user_id: string | IUser;
	status: "pending" | "inprogress" | "completed";
	attended_by: string;
	match_result: string[];
	match_review?: string;
	deleted_at?: Date;
	deleted_by?: string;
}
export interface ICallData {
	callStatus: string;
	receiverID: string;
	docID: string;
	sender: IUser;
	timestamp: string;
}
