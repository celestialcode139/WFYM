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
	children_before?: string;
	political_party?: string;
	images?: string;
	religion?: "Islam" | "Christianity" | "Buddhism" | "Hinduism" | "Judaism";
	deal_breaker?: string;
	description?: string;
	highest_degree?: string;
	smoking_habits?: string;
	drink_habits?: string;
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
	match_result: string[] | IMatchResult[];
	match_review?: string;
	deleted_at?: Date;
	deleted_by?: string;
}
export interface IMatchResult {
	match_req_id: string | IMatchRequest;
	result_user_id: string | IUser;
	is_fav: boolean;
	is_discard: boolean;
	deleted_at?: Date;
	deleted_by?: string;
}

export interface ICallData {
	callStatus: "missed" | "accepted" | "cancel" | "rejected" | "ringing";
	receiverID: string;
	docID: string;
	sender: IUser;
	timestamp: string;
}

export enum profileErrorStateFields {
	hobbies = "hobbies",
	race = "race",
	images = "images",
	identity_status = "identity_status",
	user_id = "user_id",
	city = "city",
	country = "country",
	description = "description",
	location = "location",
	personality = "personality",
	profession = "profession",
	children_before = "children_before",
	deal_breaker = "deal_breaker",
	height = "height",
	highest_degree = "highest_degree",
	political_party = "political_party",
	religion = "religion",
	weight = "weight",
	drink_habits = "drink_habits",
	smoking_habits = "smoking_habits",
}
export enum idealMatchErrorStateFields {
	race = "race",
	user_id = "user_id",
	personality = "personality",
	religion = "religion",
	political_party = "political_party",
	looking_for = "looking_for",
	description = "description",
	maxAge = "maxAge",
	minAge = "minAge",
	children_before = "children_before",
	location = "location",
}
export enum mediaErrorStateFields {
	gallery = "gallery",
	introVideo = "introVideo",
	bodyShort = "bodyShort",
}
export namespace errorFieldsKeys {
	export const profile = profileErrorStateFields;
	export const idealMatch = idealMatchErrorStateFields;
	export const media = mediaErrorStateFields;
}
